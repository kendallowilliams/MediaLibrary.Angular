using MediaLibrary.DAL.Models;
using MediaLibrary.DAL.Services.Interfaces;
using MediaLibrary.Shared.Models.Configurations;
using Microsoft.AspNetCore.Mvc;
using static MediaLibrary.Shared.Enums;

namespace MediaLibrary.API.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class MediaLibraryController : ControllerBase
    {
        private readonly IDataService dataService;

        public MediaLibraryController(IDataService _dataService) : base()
        {
            this.dataService = _dataService;
        }

        [HttpGet]
        public async Task<MediaLibraryConfiguration> Configuration()
        {
            var data = await dataService.Get<Configuration>(configuration => configuration.Type == ConfigurationTypes.MediaLibrary);

            return data.GetConfigurationObject<MediaLibraryConfiguration>();
        }
    }
}
