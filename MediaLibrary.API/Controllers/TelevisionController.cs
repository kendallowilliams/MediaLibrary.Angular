using MediaLibrary.DAL.Models;
using MediaLibrary.DAL.Services.Interfaces;
using MediaLibrary.Shared.Models.Configurations;
using Microsoft.AspNetCore.Mvc;
using static MediaLibrary.Shared.Enums;

namespace MediaLibrary.API.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class TelevisionController : ControllerBase
    {
        private readonly IDataService dataService;

        public TelevisionController(IDataService _dataService) : base()
        {
            this.dataService = _dataService;
        }

        [HttpGet]
        public async Task<TelevisionConfiguration> Configuration()
        {
            var data = await dataService.Get<Configuration>(configuration => configuration.Type == ConfigurationTypes.Television);

            return data.GetConfigurationObject<TelevisionConfiguration>();
        }
    }
}
