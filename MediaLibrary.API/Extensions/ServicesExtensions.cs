using MediaLibrary.API.Services;
using MediaLibrary.API.Services.Interfaces;

namespace MediaLibrary.API.Extensions
{
    public static class ServiceCollectionExtensions
    {
        public static void ConfigureAPIServices(this IServiceCollection services)
        {
            services.AddSingleton<IMusicService, MusicService>();
            services.AddSingleton<IPodcastService, PodcastService>();
            services.AddSingleton<IPlaylistService, PlaylistService>();
            services.AddSingleton<IPlayerService, PlayerService>();
            services.AddSingleton<ITelevisionService, TelevisionService>();
            services.AddSingleton<IMediaLibraryService, MediaLibraryService>();
        }
    }
}
