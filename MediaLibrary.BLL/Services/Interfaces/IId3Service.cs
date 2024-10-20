using MediaLibrary.DAL.Models;
using System.Threading.Tasks;

namespace MediaLibrary.BLL.Services.Interfaces
{
    public interface IId3Service
    {
        Task<MediaData> ProcessFile(string path);
    }
}
