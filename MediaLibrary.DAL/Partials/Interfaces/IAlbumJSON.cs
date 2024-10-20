using System.Collections.Generic;
using MediaLibrary.DAL.Models;
using Newtonsoft.Json;

namespace MediaLibrary.DAL.Partials.Interfaces
{
    public interface IAlbumJSON
    {
        [JsonIgnore]
        Artist Artist { get; set; }
        [JsonIgnore]
        Genre Genre { get; set; }
        [JsonIgnore]
        ICollection<Track> Tracks { get; set; }
    }
}
