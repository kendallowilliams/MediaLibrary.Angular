export enum SongSort {
    AtoZ = 0,
    Album,
    Artist,
    DateAdded,
    Genre
}
export enum ArtistSort {
    AtoZ = 0
}
export enum AlbumSort {
    AtoZ = 0
}
export enum SeriesSort {
    AtoZ = 0
}
export enum PodcastSort {
    LastUpdateDate = 0,
    AtoZ,
    DateAdded
}
export enum PodcastFilter {
    All = 0,
    Downloaded,
    Unplayed
}
export enum PlaylistSort {
    AtoZ = 0,
    DateAdded
}
export enum MusicTabs {
    Albums = 0,
    Artists,
    Songs
}
export enum MusicPages {
    Index = 0,
    Album,
    Artist,
    Search
}
export enum PlayerPages {
    Index = 0,
    Audio,
    Video
}
export enum PlaylistPages {
    Index = 0,
    Playlist
}
export enum PlaylistTabs {
    Music = 0,
    Podcast,
    Television
}
export enum PodcastPages {
    Index = 0,
    Podcast
}
export enum TelevisionPages {
    Index = 0,
    Series
}
export enum MediaPages {
    Home = 0,
    Music,
    Playlist,
    Podcast,
    Player,
    Television
}
export enum MediaTypes {
    Song,
    Podcast,
    Television
}
export enum RepeatTypes {
    None = 0,
    RepeatOne,
    RepeatAll
}

export enum AppWidth {
    Normal = 0,
    Wide
}

export enum MessageBoxConfirmType {
    OkCancel = 0,
    YesNo,
    YesNoCancel,
    TrueFalse
}