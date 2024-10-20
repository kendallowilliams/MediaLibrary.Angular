using MediaLibrary.DAL.Models;
using System.Threading.Tasks;

namespace MediaLibrary.BLL.Services.Interfaces
{
    public interface IAlbumService
    {
        Task<int?> AddAlbum(Album album);
    }
}
