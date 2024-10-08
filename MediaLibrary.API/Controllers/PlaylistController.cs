using MediaLibrary.BLL.Repository;
using MediaLibrary.DAL.Models;
using MediaLibrary.DAL.Services.Interfaces;
using MediaLibrary.Shared.Models.Configurations;
using Microsoft.AspNetCore.Mvc;
using static MediaLibrary.Shared.Enums;

namespace MediaLibrary.API.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class PlaylistController : ControllerBase
    {
        private readonly IDataService dataService;
        private readonly PlaylistRepository playlistRepository;

        public PlaylistController(IDataService _dataService, PlaylistRepository playlistRepository) : base()
        {
            this.dataService = _dataService;
            this.playlistRepository = playlistRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetPlaylists()
        {
            return new JsonResult(await dataService.GetList<Playlist>());
        }

        [HttpGet]
        public async Task<IActionResult> GetPlaylist(int id)
        {
            return new JsonResult(await dataService.Get<Playlist>(playlist => playlist.Id == id));
        }

        [HttpGet]
        public async Task<IEnumerable<Playlist>> GetByType(PlaylistTypes playlistType)
        {
            return await dataService.GetList<Playlist>(playlist => playlist.Type == playlistType);
        }

        [HttpGet]
        public async Task<IEnumerable<int>> GetSongPlaylistIds(int songId)
        {
            return await dataService.SelectWhere<PlaylistTrack, int>(pt => pt.PlaylistId, pt => pt.TrackId == songId);
        }

        [HttpPost]
        public Task<bool> AddSongToPlaylists(int songId, int[] playlistIds)
        {
            return playlistRepository.AddSongToPlaylists(songId, playlistIds);
        }

        [HttpGet]
        public async Task<PlaylistConfiguration> Configuration()
        {
            var data = await dataService.Get<Configuration>(configuration => configuration.Type == ConfigurationTypes.Playlist);

            return data.GetConfigurationObject<PlaylistConfiguration>();
        }
    }
}
