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

        public PlaylistController(IDataService _dataService) : base()
        {
            this.dataService = _dataService;
        }

        [HttpGet]
        public async Task<PlaylistConfiguration> Configuration()
        {
            var data = await dataService.Get<Configuration>(configuration => configuration.Type == ConfigurationTypes.Playlist);

            return data.GetConfigurationObject<PlaylistConfiguration>();
        }
    }
}
