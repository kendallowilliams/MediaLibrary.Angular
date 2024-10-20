using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using MediaLibrary.DAL.Models;
using MediaLibrary.BLL.Services.Interfaces;
using MediaLibrary.DAL.Services.Interfaces;
using System.Linq.Expressions;
using static MediaLibrary.Shared.Enums;
using System.Threading;
using MediaLibrary.Shared.Services.Interfaces;
using MediaLibrary.Shared.Models.Configurations;
using Newtonsoft.Json;
using Microsoft.Extensions.Logging;

namespace MediaLibrary.BLL.Services
{
    public class ProcessorService : IProcessorService
    {
        private readonly IDataService dataService;
        private readonly IPodcastService podcastService;
        private readonly IFileService fileService;
        private readonly ITPLService tplService;
        private readonly ILogger<ProcessorService> logger;

        public ProcessorService(IDataService dataService, IPodcastService podcastService, IFileService fileService,
                                ITPLService tplService, ILogger<ProcessorService> logger)
        {
            this.dataService = dataService;
            this.podcastService = podcastService;
            this.fileService = fileService;
            this.tplService = tplService;
            this.logger = logger;
        }

        public async Task RefreshPodcasts()
        {
            IEnumerable<Podcast> podcasts = null;
            var configuration = await dataService.Get<Configuration>(item => item.Type == ConfigurationTypes.Podcast);
            var podcastConfiguration = configuration.GetConfigurationObject<PodcastConfiguration>();
            DateTime lastAutoDownloadDate = podcastConfiguration.LastAutoDownloadDate;

            try
            {
                podcasts = await dataService.GetList<Podcast>();
                await tplService.ConcurrentAsync(async podcast =>
                    {
                        string message = $"{nameof(ProcessorService)} -> {nameof(RefreshPodcasts)} -> {nameof(PodcastService.RefreshPodcast)}";

                        try
                        {

                            var newItems = Enumerable.Empty<PodcastItem>();

                            logger.LogTrace($"{message} [{podcast.Title}] started...");
                            await podcastService.RefreshPodcast(podcast);
                            newItems = podcast.PodcastItems.Where(item => item.PublishDate > lastAutoDownloadDate && !item.IsDownloaded);

                            if (podcast.DownloadNewEpisodes && newItems.Any())
                            {
                                logger.LogTrace($"Podcast [{podcast.Title}] auto-download started...");

                                foreach (var item in newItems) 
                                { 
                                    await podcastService.AddPodcastFile(item.Id);
                                    logger.LogInformation($"File [{item.Url}] downloaded.");
                                }

                                logger.LogTrace($"Podcast [{podcast.Title}] auto-download completed.");
                            }

                            logger.LogTrace($"{message} [{podcast.Title}] completed.");
                        }
                        catch(AggregateException ex)
                        {
                            logger.LogWarning($"{message} [{podcast.Title}] failed.");
                            logger.LogError(ex, ex.Message);
                        }
                        catch(Exception ex)
                        {
                            logger.LogWarning($"{message} [{podcast.Title}] failed.");
                            logger.LogError(ex, ex.Message);
                        }
                    }, podcasts, 4, default(CancellationToken));
                podcastConfiguration.LastAutoDownloadDate = DateTime.Now;
                configuration.SetConfigurationObject(podcastConfiguration);
                await dataService.Update(configuration);
                await podcastService.CleanMissingPodcastFiles();
            }
            catch (AggregateException ex)
            {
                logger.LogError(ex, ex.Message);
            }
            catch (Exception ex)
            {
                logger.LogError(ex, ex.Message);
            }
        }

        public async Task RefreshMusic()
        {
            await fileService.CheckForMusicUpdates();
        }
    }
}