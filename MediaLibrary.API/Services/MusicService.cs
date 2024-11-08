using MediaLibrary.API.Services.Interfaces;
using MediaLibrary.DAL.Models;
using MediaLibrary.DAL.Services.Interfaces;
using MediaLibrary.Shared.Models.Configurations;
using Microsoft.Extensions.Caching.Memory;
using static MediaLibrary.Shared.Enums;

namespace MediaLibrary.API.Services
{
    public class MusicService : IMusicService
    {
        private readonly IDataService _dataService;
        private readonly IMemoryCache _memoryCache;

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
            return _memoryCache.TryGetValue(CacheKeys.Albums, out IEnumerable<Album>? albums) && !reload ? 
                albums! : 
                await _dataService.GetList<Album>()
                    .ContinueWith(task => _memoryCache.Set(CacheKeys.Albums, task.Result));
        }

        public async Task<Album> GetAlbum(int id)
        {
            return _memoryCache.TryGetValue($"{ALBUM_KEY}_{id}", out Album? album) ?
                album! :
                await _dataService.Get<Album>(album => album.Id == id)
                    .ContinueWith(task => _memoryCache.Set($"{ALBUM_KEY}_{id}", task.Result));
        }

        public async Task<IEnumerable<Artist>> GetArtists(bool reload = false)
        {
            return _memoryCache.TryGetValue(CacheKeys.Artists, out IEnumerable<Artist>? artists) && !reload ?
                artists! :
                await _dataService.GetList<Artist>().ContinueWith(task => _memoryCache.Set(CacheKeys.Artists, task.Result));
        }

        public async Task<Artist> GetArtist(int id)
        {
            return _memoryCache.TryGetValue($"{ARTIST_KEY}_{id}", out Artist? artist) ?
                artist! :
                await _dataService.Get<Artist>(artist => artist.Id == id)
                    .ContinueWith(task => _memoryCache.Set($"{ARTIST_KEY}_{id}", task.Result));
        }

        public async Task<IEnumerable<Track>> GetTracks(bool reload = false)
        {
            return _memoryCache.TryGetValue(CacheKeys.Tracks, out IEnumerable<Track>? tracks) && !reload ?
                tracks! :
                await _dataService.GetList<Track>().ContinueWith(task => _memoryCache.Set(CacheKeys.Tracks, task.Result));
        }

        public async Task<IEnumerable<Track>> GetTracksByAlbumId(int albumId)
        {
            return await _dataService.GetList<Track>(track => track.AlbumId == albumId);
        }

        public async Task<Track> GetTrack(int id)
        {
            return _memoryCache.TryGetValue($"{TRACK_KEY}_{id}", out Track? track) ?
                track! :
                await _dataService.Get<Track>(track => track.Id == id)
                    .ContinueWith(task => _memoryCache.Set($"{TRACK_KEY}_{id}", task.Result));
        }

        public async Task<Track> UpdateTrack(Track track)
        {
            var existingTrack = await _dataService.Get<Track>(t => t.Id == track.Id);

            if (existingTrack == null)
            {
                throw new Exception("track not found.");
            }

            existingTrack.ArtistId = track.ArtistId;
            existingTrack.AlbumId = track.AlbumId;
            existingTrack.GenreId = track.GenreId;
            existingTrack.Title = track.Title;
            existingTrack.Year = track.Year;
            existingTrack.Position = track.Position;

            if (await _dataService.Update(existingTrack) <= 0)
            {
                throw new Exception("failed to update track.");
            }

            _memoryCache.Remove(CacheKeys.Tracks);

            return existingTrack;
        }

        public Task<IEnumerable<Genre>> GetGenres()
        {
            return _dataService.GetList<Genre>();
        }

        public Task<string?> GetFilePath(int id)
        {
            return _dataService
                .SelectWhere<Track, string[]>(track => new string[]
                {
                    track.Path.Location,
                    track.FileName
                }, track => track.Id == id)
                .ContinueWith(task =>
                {
                    var paths = task.Result.FirstOrDefault();

                    return paths != null ? Path.Combine(paths) : null;
                });
        }

        public void ClearCache()
        {
            foreach (var key in Enum.GetValues(typeof(CacheKeys)))
            {
                _memoryCache.Remove(key);
            }
        }
    }
}
