using MediaLibrary.API.Services.Interfaces;
using MediaLibrary.DAL.Models;
using MediaLibrary.Shared.Models.Configurations;
using Microsoft.AspNetCore.Mvc;

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

        [HttpGet]
        public async Task<IEnumerable<Album>> Albums() => await musicService.GetAlbums();

        [HttpGet]
        [Route("{id:int}")]
        public async Task<Album> Album(int id) => await musicService.GetAlbum(id);

        [HttpGet]
        public async Task<IEnumerable<Artist>> Artists() => await musicService.GetArtists();

        [HttpGet]
        [Route("{id:int}")]
        public async Task<Artist> Artist(int id) => await musicService.GetArtist(id);

        [HttpGet]
        public async Task<IEnumerable<Track>> Tracks() => await musicService.GetTracks();

        [HttpGet]
        [Route("{id:int}")]
        public async Task<Track> Track(int id) => await musicService.GetTrack(id);
    }
}
