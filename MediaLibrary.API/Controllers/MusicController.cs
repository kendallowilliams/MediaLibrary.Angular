using MediaLibrary.DAL.Models;
using MediaLibrary.DAL.Services.Interfaces;
using MediaLibrary.Shared.Models.Configurations;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using static MediaLibrary.Shared.Enums;

namespace MediaLibrary.API.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class MusicController : ControllerBase
    {
        private readonly IDataService dataService;

        public MusicController(IDataService _dataService) : base()
        {
            this.dataService = _dataService;
        }
        
        [HttpGet]
        public async Task<IActionResult> Configuration()
        {
            var data = await dataService.Get<Configuration>(configuration => configuration.Type == ConfigurationTypes.Music);

            return new JsonResult(data.GetConfigurationObject<MusicConfiguration>());
        }
    }
}
