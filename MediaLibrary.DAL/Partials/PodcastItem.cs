﻿using MediaLibrary.DAL.Models.Interfaces;
using MediaLibrary.DAL.Partials.Interfaces;
using IO_File = System.IO.File;
using System.ComponentModel.DataAnnotations.Schema;

namespace MediaLibrary.DAL.Models
{
    public partial class PodcastItem: IPlayableItem, IPodcastItemJSON
    {
        public bool IsDownloaded { get => !string.IsNullOrWhiteSpace(this.File) && IO_File.Exists(this.File); }

        [NotMapped]
        public bool IsDownloading { get; set; }

        public bool IsPlayed { get => LastPlayedDate.HasValue; }

        public bool IsStarted { get => Progress != 0; }
    }
}
