using MediaLibrary.API.Services.Interfaces;
using MediaLibrary.DAL.Models;
using MediaLibrary.Shared.Models.Configurations;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;

namespace MediaLibrary.API.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class MusicController : ControllerBase
    {
        private readonly IMusicService musicService;

        public MusicController(IMusicService _musicService) : base()
        {
            this.musicService = _musicService;
        }

        [HttpGet]
        public async Task<MusicConfiguration> Configuration() => await musicService.GetConfiguration();

        [HttpPost]
        public async Task Configuration(MusicConfiguration configuration) => await musicService.UpdateConfiguration(configuration);

        #region ALBUM
        [HttpGet]
        public async Task<IEnumerable<Album>> Albums() => await musicService.GetAlbums();

        [HttpGet]
        [Route("{id:int}")]
        public async Task<Album> Album(int id) => await musicService.GetAlbum(id);
        #endregion

        #region ARTIST
        [HttpGet]
        public async Task<IEnumerable<Artist>> Artists() => await musicService.GetArtists();

        [HttpGet]
        [Route("{id:int}")]
        public async Task<Artist> Artist(int id) => await musicService.GetArtist(id);
        #endregion

        #region TRACK
        [HttpGet]
        public async Task<IEnumerable<Track>> Tracks() => await musicService.GetTracks();

        [HttpGet]
        [Route("{albumId:int}")]
        public async Task<IEnumerable<Track>> TracksByAlbumId(int albumId) => await musicService.GetTracksByAlbumId(albumId);

        [HttpGet]
        [Route("{id:int}")]
        public async Task<Track> Track(int id) => await musicService.GetTrack(id);

        [HttpPost]
        public async Task<Track> UpdateTrack(Track track) => await musicService.UpdateTrack(track);

        [HttpGet]
        [Route("{id:int}")]
        public async Task<IActionResult?> File(int id)
        {
            var filePath = await musicService.GetFilePath(id); 
            var provider = new FileExtensionContentTypeProvider();

            if (filePath != null && provider.TryGetContentType(filePath, out string contentType))
            {
                return new PhysicalFileResult(filePath, contentType) { EnableRangeProcessing = true };
            }

            return null;
        }
        #endregion

        #region Genres
        [HttpGet]
        public async Task<IEnumerable<Genre>> Genres() => await musicService.GetGenres();
        #endregion
    }
}
