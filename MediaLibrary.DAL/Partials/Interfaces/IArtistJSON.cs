using System.Collections.Generic;
using MediaLibrary.DAL.Models;
using Newtonsoft.Json;

namespace MediaLibrary.DAL.Partials.Interfaces
{
    public interface IArtistJSON
    {
        [JsonIgnore]
        ICollection<Album> Albums { get; set; }
        [JsonIgnore]
        ICollection<Track> Tracks { get; set; }
    }
}
