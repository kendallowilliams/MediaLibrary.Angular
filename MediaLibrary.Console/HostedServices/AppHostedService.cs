using MediaLibrary.BLL.Services.Interfaces;
using MediaLibrary.DAL.Models;
using MediaLibrary.DAL.Services.Interfaces;
using MediaLibrary.Shared.Models.Configurations;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System.Diagnostics;
using static MediaLibrary.Shared.Enums;

namespace MediaLibrary.Console.HostedServices
{
    public class AppHostedService : IHostedService
    {
        private readonly IProcessorService processorService;
        private readonly ILogger<AppHostedService> logger;
        private readonly IDataService dataService;

        public AppHostedService(IProcessorService processorService, ILogger<AppHostedService> logger, IDataService dataService)
        {
            this.processorService = processorService;
            this.logger = logger;
            this.dataService = dataService;
        }

        public Task StartAsync(CancellationToken cancellationToken)
        {
            RepeatAsync(cancellationToken);
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
                var tasksToRun = new List<Func<Task>>()
                {
                    () => processorService.RefreshMusic(),
                    () => processorService.RefreshPodcasts()
                };
                DateTime nextRunTime = mediaLibraryConfig.ConsoleAppLastRunTimeStamp.AddMinutes(mediaLibraryConfig.ConsoleAppRunInterval),
                         dtNow = DateTime.Now;

                dtNow = dtNow.AddMilliseconds(-dtNow.Millisecond);
                nextRunTime = nextRunTime.AddMilliseconds(-nextRunTime.Millisecond);
                Trace.WriteLine($"{nameof(RepeatAsync)}: Now [{dtNow}], Next [{nextRunTime}]");

                if (Math.Floor(nextRunTime.Subtract(dtNow).TotalSeconds) <= 0.0)
                {
                    mediaLibraryConfig.ConsoleAppLastRunTimeStamp = dtNow;
                    config.SetConfigurationObject(mediaLibraryConfig);
                    tasksToRun.Add(() => dataService.Update(config));

                    await Task.WhenAll(tasksToRun.Select(task => task()));
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
