using MediaLibrary.DAL.Models;
using MediaLibrary.DAL.Services.Interfaces;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MediaLibrary.BLL.Repository
{
    public class PlaylistRepository
    {
        private readonly IDataService dataService;

        public PlaylistRepository(IDataService dataService)
        {
            this.dataService = dataService;
        }

        public async Task<bool> AddSongToPlaylists(int songId, IEnumerable<int> newPlaylistIds)
        {
            var existingPlaylistIds = await dataService
                .SelectWhere<PlaylistTrack, int>(pt => pt.PlaylistId, pt => pt.TrackId == songId);
            var playlistTracks = newPlaylistIds.Where(id => !existingPlaylistIds.Contains(id))
                .Select(id => new PlaylistTrack()
                {
                    PlaylistId = id,
                    TrackId = songId
                });

            await dataService.DeleteAll<PlaylistTrack>(pt => !newPlaylistIds.Contains(pt.PlaylistId) && pt.TrackId == songId);

            return await dataService.Insert(playlistTracks).ContinueWith(t => t.Result > 0);
        }
    }
}
