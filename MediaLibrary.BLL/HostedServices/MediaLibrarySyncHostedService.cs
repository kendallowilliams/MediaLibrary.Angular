using MediaLibrary.BLL.Services.Interfaces;
using MediaLibrary.DAL.Models;
using MediaLibrary.DAL.Services.Interfaces;
using MediaLibrary.Shared.Models.Configurations;
using MediaLibrary.Shared.Services.Interfaces;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using static MediaLibrary.Shared.Enums;

namespace MediaLibrary.BLL.HostedServices
{
    public class MediaLibrarySyncHostedService : IHostedService
    {
        private readonly IProcessorService processorService;
        private readonly ILogger<MediaLibrarySyncHostedService> logger;
        private readonly IDataService dataService;
        private readonly IBackgroundTaskQueueService backgroundTaskQueueService;

        public MediaLibrarySyncHostedService(
            IProcessorService processorService, 
            ILogger<MediaLibrarySyncHostedService> logger, 
            IDataService dataService,
            IBackgroundTaskQueueService backgroundTaskQueueService)
        {
            this.processorService = processorService;
            this.logger = logger;
            this.dataService = dataService;
            this.backgroundTaskQueueService = backgroundTaskQueueService;
        }

        public Task StartAsync(CancellationToken cancellationToken)
        {
            RepeatAsync(cancellationToken).ConfigureAwait(false);
            return Task.CompletedTask;
        }

        public async Task StopAsync(CancellationToken cancellationToken)
        {
            await Task.CompletedTask;
        }

        private async Task RepeatAsync(CancellationToken cancellationToken)
        {
            while (!cancellationToken.IsCancellationRequested)
            {
                var config = await dataService.Get<Configuration>(item => item.Type == ConfigurationTypes.MediaLibrary);
                var mediaLibraryConfig = config.GetConfigurationObject<MediaLibraryConfiguration>();
                DateTime nextRunTime = mediaLibraryConfig.ConsoleAppLastRunTimeStamp.AddMinutes(mediaLibraryConfig.ConsoleAppRunInterval),
                         dtNow = DateTime.Now;

                dtNow = dtNow.AddMilliseconds(-dtNow.Millisecond);
                nextRunTime = nextRunTime.AddMilliseconds(-nextRunTime.Millisecond);
                Trace.WriteLine($"{nameof(RepeatAsync)}: Now [{dtNow}], Next [{nextRunTime}]");

                if (Math.Floor(nextRunTime.Subtract(dtNow).TotalSeconds) <= 0.0)
                {
                    var tasksToRun = new List<Func<Task>>()
                    {
                        () => processorService.RefreshMusic(),
                        () => processorService.RefreshPodcasts()
                    };

                    mediaLibraryConfig.ConsoleAppLastRunTimeStamp = dtNow;
                    config.SetConfigurationObject(mediaLibraryConfig);
                    backgroundTaskQueueService.QueueBackgroundWorkItem((token) => Task.WhenAll(tasksToRun.Select(task => task())));
                    await dataService.Update(config);
                }
                else
                {
                    int delayMs = (nextRunTime.Subtract(dtNow).Minutes * 60 + nextRunTime.Subtract(dtNow).Seconds) * 1000;

                    Trace.WriteLine($"{nameof(RepeatAsync)}: Delay started: {delayMs} milliseconds...");
                    await Task.Delay(delayMs, cancellationToken);
                    Trace.WriteLine($"{nameof(RepeatAsync)}: Delay completed.");
                }
            }
        }
    }
}
