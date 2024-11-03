using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using System.Reflection;
using MediaLibrary.BLL.Extensions;
using Microsoft.Extensions.DependencyInjection;
using MediaLibrary.BLL.HostedServices;

namespace MediaLibrary.Console
{
    internal class Program
    {
        static async Task Main(string[] args)
        {
            await Host.CreateDefaultBuilder(args)
                      .ConfigureAppConfiguration((context, builder) =>
                      {
                          var env = context.HostingEnvironment;

                          builder.AddCommandLine(args);

                          if (env.IsDevelopment())
                          {
                              var assembly = Assembly.Load(new AssemblyName(env.ApplicationName));

                              builder.AddUserSecrets(assembly);
                          }
                      })
                      .ConfigureServices((context, services) =>
                      {
                          services.AddMemoryCache();
                          services.AddHostedService<MediaLibrarySyncHostedService>();
                          services.ConfigureServices(context.Configuration);
                      })
                      .Build()
                      .RunAsync();
        }
    }
}
