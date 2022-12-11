using MediaLibrary.API.Services.Interfaces;
using MediaLibrary.DAL.Models;
using MediaLibrary.DAL.Services.Interfaces;
using MediaLibrary.Shared.Models.Configurations;
using Microsoft.Extensions.Caching.Memory;
using System.ComponentModel;
using static MediaLibrary.Shared.Enums;

namespace MediaLibrary.API.Services
{
    public class MusicService : IMusicService
    {
        private readonly IDataService _dataService;
        private readonly IMemoryCache _memoryCache;

        private const string ALBUMS_KEY = "ML_ALBUMS";
        private const string ARTISTS_KEY = "ML_ARTISTS";
        private const string TRACKS_KEY = "ML_TRACKS";

        public MusicService(IDataService dataService, IMemoryCache memoryCache)
        {
            this._dataService = dataService;
            this._memoryCache = memoryCache;
        }

        public async Task<MusicConfiguration> GetConfiguration()
        {
            var data = await _dataService.Get<Configuration>(configuration => configuration.Type == ConfigurationTypes.Music);

            return data.GetConfigurationObject<MusicConfiguration>();
        }

        public async Task UpdateConfiguration(MusicConfiguration musicConfiguration)
        {
            var configuration = await _dataService.Get<Configuration>(configuration => configuration.Type == ConfigurationTypes.Music);

            configuration.SetConfigurationObject(musicConfiguration);
            await _dataService.Update(configuration);
        }

        public async Task<IEnumerable<Album>> GetAlbums(bool reload = false)
        {
            return _memoryCache.TryGetValue(ALBUMS_KEY, out IEnumerable<Album>? albums) && !reload ? 
                albums! : 
                await _dataService.GetList<Album>()
                    .ContinueWith(task => _memoryCache.Set(ALBUMS_KEY, task.Result));
        }

        public async Task<IEnumerable<Artist>> GetArtists(bool reload = false)
        {
            return _memoryCache.TryGetValue(ARTISTS_KEY, out IEnumerable<Artist>? artists) && !reload ?
                artists! :
                await _dataService.GetList<Artist>().ContinueWith(task => _memoryCache.Set(ARTISTS_KEY, task.Result));
        }

        public async Task<IEnumerable<Track>> GetTracks(bool reload = false)
        {
            return _memoryCache.TryGetValue(TRACKS_KEY, out IEnumerable<Track>? tracks) && !reload ?
                tracks! :
                await _dataService.GetList<Track>().ContinueWith(task => _memoryCache.Set(TRACKS_KEY, task.Result));
        }
    }
}
