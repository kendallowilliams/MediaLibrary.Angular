using MediaLibrary.DAL.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace MediaLibrary.DAL.Partials.Interfaces
{
    public interface ITrackJSON
    {
        [JsonIgnore]
        ICollection<PlaylistTrack> PlaylistTracks { get; set; }
    }
}
