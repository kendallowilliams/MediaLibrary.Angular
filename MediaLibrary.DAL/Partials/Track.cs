﻿using MediaLibrary.DAL.Models.Interfaces;
using MediaLibrary.DAL.Partials.Interfaces;

namespace MediaLibrary.DAL.Models
{
    public partial class Track: IPlayableItem, ITrackJSON
    {
    }
}
