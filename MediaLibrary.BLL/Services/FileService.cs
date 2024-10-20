using MediaLibrary.BLL.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using MediaLibrary.DAL.Models;
using MediaLibrary.DAL.Services.Interfaces;
using Microsoft.Extensions.Configuration;
using static MediaLibrary.Shared.Enums;
using MediaLibrary.Shared.Models.Configurations;

namespace MediaLibrary.BLL.Services
{
    public class FileService : IFileService
    {
        private readonly IDataService dataService;
        private readonly IId3Service id3Service;
        private readonly IArtistService artistService;
        private readonly IAlbumService albumService;
        private readonly IGenreService genreService;
        private readonly ITrackService trackService;
        private readonly IConfiguration configuration;

        public FileService(IId3Service id3Service, IArtistService artistService, IAlbumService albumService,
                           IGenreService genreService, ITrackService trackService, IDataService dataService, 
                           IConfiguration configuration)
        {
            this.id3Service = id3Service;
            this.artistService = artistService;
            this.albumService = albumService;
            this.genreService = genreService;
            this.trackService = trackService;
            this.dataService = dataService;
            this.configuration = configuration;
        }

        public string PodcastFolder { get => Path.Combine(RootFolder, "Podcast"); }

        public string RootFolder { get => Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.CommonMusic, Environment.SpecialFolderOption.Create), "MediaLibrary"); }

        public IEnumerable<string> EnumerateDirectories(string path, string searchPattern = "*", bool recursive = false)
        {
            SearchOption searchOption = recursive ? SearchOption.AllDirectories : SearchOption.TopDirectoryOnly;
            DirectoryInfo directoryInfo = CanUseDirectory(path) ? new DirectoryInfo(path) : default;

            return directoryInfo != null ?
                Directory.EnumerateDirectories(directoryInfo.FullName, searchPattern, searchOption) :
                Enumerable.Empty<string>();
        }

        public IEnumerable<string> EnumerateFiles(string path, string searchPattern = "*", bool recursive = false)
        {
            SearchOption searchOption = recursive ? SearchOption.AllDirectories : SearchOption.TopDirectoryOnly;
            DirectoryInfo directoryInfo = CanUseDirectory(path) ? new DirectoryInfo(path) : default;

            return directoryInfo != null ?
                Directory.EnumerateFiles(directoryInfo.FullName, searchPattern, searchOption) : 
                Enumerable.Empty<string>();
        }

        public void Write(string path, byte[] data) => File.WriteAllBytes(path, data);

        public void Write(string path, string data) => File.WriteAllText(path, data);

        public bool Exists(string path) => File.Exists(path);

        public void Delete(string path)
        {
            if (File.Exists(path)) { File.Delete(path); }
        }

        public async Task ReadDirectory(string path, bool recursive = false)
        {
            IEnumerable<string> fileTypes = configuration["FileTypes"].Split(",".ToCharArray(), StringSplitOptions.RemoveEmptyEntries),
                                allFiles = EnumerateFiles(path, recursive: recursive);
            var fileGroups = allFiles.Where(file => fileTypes.Contains(Path.GetExtension(file), StringComparer.OrdinalIgnoreCase))
                                        .GroupBy(file => Path.GetDirectoryName(file), StringComparer.OrdinalIgnoreCase);

            foreach (var group in fileGroups.Where(item => Directory.Exists(item.Key)))
            {
                foreach (string file in group) { await ReadMediaFile(file); }
            }
        }

        public async Task ReadMediaFile(string path)
        {
            MediaData data = await id3Service.ProcessFile(path);
            int? genreId = await genreService.AddGenre(data.Genres),
                artistId = await artistService.AddArtist(data.Artists),
                albumId = await albumService.AddAlbum(new Album()
                {
                    Title = data.Album,
                    ArtistId = artistId,
                    GenreId = genreId,
                    Year = (int)data.Year
                }),
                pathId = await trackService.AddPath(Path.GetDirectoryName(path));
            Track track = new Track()
            {
                Title = data.Title,
                FileName = data.FileName,
                PathId = pathId,
                AlbumId = albumId,
                GenreId = genreId,
                ArtistId = artistId,
                Position = (int)data.Track,
                Year = (int)data.Year,
                Duration = (decimal)data.Duration,
                PlayCount = 0
            };

            await dataService.Insert(track);
        }

        public async Task CheckForMusicUpdates(bool canDelete = false)
        {
            var musicConfiguration = await dataService.Get<Configuration>(item => item.Type == ConfigurationTypes.Music)
                                                        .ContinueWith(task => task.Result.GetConfigurationObject<MusicConfiguration>() ?? 
                                                                            new MusicConfiguration());
            IEnumerable<string> fileTypes = configuration["FileTypes"].Split(",".ToCharArray(), StringSplitOptions.RemoveEmptyEntries),
                                configPaths = musicConfiguration.MusicPaths;
            IEnumerable<TrackPath> savedPaths = await dataService.GetList<TrackPath>(includes: path => path.Tracks),
                                    validPaths = savedPaths.Where(_path => _path.Tracks.Any()),
                                    emptyPaths = savedPaths.Where(_path => !_path.Tracks.Any()),
                                    invalidPaths = savedPaths.Where(_path => !configPaths.Any(p => _path.Location.StartsWith(p, StringComparison.OrdinalIgnoreCase)));
            IEnumerable<Album> albumsToDelete = Enumerable.Empty<Album>();
            IEnumerable<Artist> artistsToDelete = Enumerable.Empty<Artist>();

            foreach (TrackPath path in validPaths)
            {
                IEnumerable<Track> tracks = path.Tracks;
                IEnumerable<string> existingFiles = tracks.Select(track => Path.Combine(path.Location, track.FileName)),
                                    files = EnumerateFiles(path.Location).Where(file => fileTypes.Contains(Path.GetExtension(file), StringComparer.OrdinalIgnoreCase)),
                                    deletedFiles = existingFiles.Where(file => !File.Exists(file)),
                                    newFiles = files.Except(existingFiles),
                                    existingDirectories = savedPaths.Where(_path => !path.Equals(_path) && 
                                                                                    _path.Location.StartsWith(path.Location))
                                                                    .Select(_path => _path.Location);

                foreach (string file in newFiles)
                {
                    await ReadMediaFile(file);
                }

                if (canDelete)
                {
                    foreach (string file in deletedFiles)
                    {
                        Track song = tracks.FirstOrDefault(track => track.FileName.Equals(Path.GetFileName(file), StringComparison.OrdinalIgnoreCase));

                        await dataService.Delete(song);
                    }

                    foreach (var _path in invalidPaths) { await dataService.Delete<TrackPath>(_path.Id); }
                }

                path.LastScanDate = DateTime.Now;
                await dataService.Update(path);
            }

            foreach (TrackPath path in emptyPaths) { await dataService.Delete<TrackPath>(path.Id); }
            albumsToDelete = await dataService.GetList<Album>(album => album.Tracks.Count() == 0, default, album => album.Tracks);
            artistsToDelete = await dataService.GetList<Artist>(artist => artist.Tracks.Count() == 0, default, artist => artist.Tracks);
            foreach (Album album in albumsToDelete) { await dataService.Delete<Album>(album.Id); }
            foreach (Artist artist in artistsToDelete) { await dataService.Delete<Artist>(artist.Id); }
        }

        public bool CanUseDirectory(string path)
        {
            Func<DirectoryInfo, bool> canUse = dirInfo => (dirInfo.Attributes & FileAttributes.Hidden) != FileAttributes.Hidden &&
                                                          (dirInfo.Attributes & FileAttributes.System) != FileAttributes.System;

            return !string.IsNullOrWhiteSpace(path) && Directory.Exists(path) && canUse(new DirectoryInfo(path));
        }
    }
}