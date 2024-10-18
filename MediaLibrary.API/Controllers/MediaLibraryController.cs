using MediaLibrary.BLL.Services.Interfaces;
using MediaLibrary.DAL.Models;
using MediaLibrary.DAL.Services.Interfaces;
using MediaLibrary.Shared.Models;
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
        private readonly IFileService fileService;

        public MediaLibraryController(IDataService _dataService, IFileService fileService) : base()
        {
            this.dataService = _dataService;
            this.fileService = fileService;
        }

        [HttpGet]
        public async Task<MediaLibraryConfiguration> Configuration()
        {
            var data = await dataService.Get<Configuration>(configuration => configuration.Type == ConfigurationTypes.MediaLibrary);

            return data.GetConfigurationObject<MediaLibraryConfiguration>();
        }

        public DirectoryModel GetDirectory(string path)
        {
            return new DirectoryModel()
            {
                Name = Path.GetFileName(path),
                Path = path,
                SubDirectories = fileService.EnumerateDirectories(path)
                    .Select(directory => new DirectoryModel()
                    {
                        Name = Path.GetFileName(directory),
                        Path = directory
                    })
            };
        }
    }
}
