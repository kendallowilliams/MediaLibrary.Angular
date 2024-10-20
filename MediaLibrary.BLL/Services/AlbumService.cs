﻿using System.Threading.Tasks;
using MediaLibrary.DAL.Services.Interfaces;
using MediaLibrary.BLL.Services.Interfaces;
using MediaLibrary.DAL.Models;

namespace MediaLibrary.BLL.Services
{
    public class AlbumService : IAlbumService
    {
        private readonly IDataService dataService;

        public AlbumService(IDataService dataService)
        {
            this.dataService = dataService;
        }

        public async Task<int?> AddAlbum(Album album)
        {
            int? id = default(int?);

            if (album != null)
            {
                Album dbAlbum = await dataService.Get<Album>(item => item.Title == album.Title);

                if (dbAlbum != null) { id = dbAlbum.Id; }
                else
                {
                    await dataService.Insert(album);
                    id = album.Id;
                }
            }

            return id;
        }
    }
}