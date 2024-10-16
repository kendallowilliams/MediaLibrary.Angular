﻿using MediaLibrary.DAL.Models;
using MediaLibrary.Shared.Models.Configurations;

namespace MediaLibrary.API.Services.Interfaces
{
    public interface IMusicService
    {
        Task<MusicConfiguration> GetConfiguration();

        Task UpdateConfiguration(MusicConfiguration musicConfiguration);

        Task<IEnumerable<Album>> GetAlbums(bool reload = false);

        Task<Album> GetAlbum(int id);

        Task<IEnumerable<Artist>> GetArtists(bool reload = false);

        Task<Artist> GetArtist(int id);

        Task<IEnumerable<Track>> GetTracks(bool reload = false);

        Task<IEnumerable<Track>> GetTracksByAlbumId(int albumId);

        Task<IEnumerable<Genre>> GetGenres();

        Task<string?> GetFilePath(int id);

        Task<Track> GetTrack(int id);

        Task<Track> UpdateTrack(Track track);
    }
}
