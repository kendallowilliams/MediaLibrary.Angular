using MediaLibrary.BLL.Services.Interfaces;
using MediaLibrary.DAL.Models;
using MediaLibrary.DAL.Services.Interfaces;
using MediaLibrary.Shared.Models;
using MediaLibrary.Shared.Models.Configurations;
using Microsoft.AspNetCore.Mvc;
using System.IO;
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

        [HttpGet]
        public async Task<DirectoryModel> GetDirectory(string path)
        {
            var paths = await dataService.GetList<TrackPath>();

            return new DirectoryModel()
            {
                Name = Path.GetFileName(path),
                Path = path,
                SubDirectories = fileService.EnumerateDirectories(path)
                    .Select(directory => new DirectoryModel()
                    {
                        Name = Path.GetFileName(directory),
                        Path = directory,
                        PathId = paths.FirstOrDefault(p => p.Location == directory)?.Id
                    })
            };
        }

        [HttpPost]
        public async Task<int?> AddMusicDirectory(string path)
        {
            if (fileService.CanUseDirectory(path))
            {
                var directoryInfo = new DirectoryInfo(path);
                bool pathExists = await dataService.Exists<TrackPath>(item => item.Location == directoryInfo.FullName);

                if (!pathExists)
                {
                    var entity = new TrackPath() { Location = directoryInfo.FullName };
                    await dataService.Insert(entity);
                    return entity.Id;
                }
            }

            return null;
        }

        [HttpPost]
        public async Task<bool> RemoveMusicDirectory(int id)
        {
           return await dataService.Delete<TrackPath>(id).ContinueWith(t => t.Result > 0);
        }
    }
}
