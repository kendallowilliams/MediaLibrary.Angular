using System;
using System.Collections.Generic;
using System.Text;

namespace MediaLibrary.Shared
{
    public class Enums
    {
        public enum MediaTypes { Song = PlaylistTypes.Music, Podcast = PlaylistTypes.Podcast, Television = PlaylistTypes.Television }

        public enum PlaylistTypes { Music, Podcast, Television }

        public enum SongSort { AtoZ = 0, Album, Artist, DateAdded, Genre, None = -1 }

        public enum ArtistSort { AtoZ = 0, None = -1 }

        public enum AlbumSort { AtoZ = 0, None = -1 }

        public enum SeriesSort { AtoZ = 0 }

        public enum PodcastSort { LastUpdateDate = 0, AtoZ, DateAdded }

        public enum PodcastFilter { All = 0, Downloaded, Unplayed }

        public enum PlaylistSort { AtoZ = 0, DateAdded }

        public enum MusicTabs { Albums = 0, Artists, Songs }

        public enum MusicPages { Index = 0, Album, Artist, Search }

        public enum PlayerPages { Index = 0, Audio, Video }

        public enum PlaylistPages { Index = 0, Playlist }

        public enum PlaylistTabs { Music = PlaylistTypes.Music, Podcast = PlaylistTypes.Podcast, Television = PlaylistTypes.Television }

        public enum PodcastPages { Index = 0, Podcast }

        public enum TelevisionPages { Index = 0, Series }

        public enum MediaPages { Home = 0, Music, Playlist, Podcast, Player, Television }

        public enum RepeatTypes { None = 0, RepeatOne, RepeatAll }

        public enum AppWidth { Normal = 0, Wide}

        public enum SettingsTabs { General = 0, Music, Podcast, Television, Playlist, Player }

        public enum CacheKeys { None = 0, Tracks, Albums, Artists, Podcasts, Series }

        public enum ConfigurationTypes { Home = 0, Music, Playlist, Podcast, Player, Television, MediaLibrary }
    }
}
