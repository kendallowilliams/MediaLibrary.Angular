using MediaLibrary.Shared.Services.Interfaces;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace MediaLibrary.Shared.HostedServices
{
    public class BackgroundQueueHostedService : BackgroundService
    {
        private readonly ILogger<BackgroundQueueHostedService> logger;

        public BackgroundQueueHostedService(IBackgroundTaskQueueService taskQueue, ILogger<BackgroundQueueHostedService> logger)
        {
            TaskQueue = taskQueue;
            this.logger = logger;
        }

        public IBackgroundTaskQueueService TaskQueue { get; }

        protected async override Task ExecuteAsync(CancellationToken cancellationToken)
        {
            while (!cancellationToken.IsCancellationRequested)
            {
                var workItem = await TaskQueue.DequeueAsync(cancellationToken);

                try
                {
                    await workItem(cancellationToken);
                }
                catch (Exception ex)
                {
                    logger.LogError(ex, ex.Message);
                }
            }
        }
    }
}
