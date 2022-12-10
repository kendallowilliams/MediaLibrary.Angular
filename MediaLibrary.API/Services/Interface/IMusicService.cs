using MediaLibrary.DAL.Models;
using MediaLibrary.Shared.Models.Configurations;

namespace MediaLibrary.API.Services.Interfaces
{
    public interface IMusicService
    {
        Task<MusicConfiguration> GetConfiguration();

        Task<IEnumerable<Album>> GetAlbums(bool reload = false);

        Task<IEnumerable<Artist>> GetArtists(bool reload = false);

        Task<IEnumerable<Track>> GetTracks(bool reload = false);
    }
}
