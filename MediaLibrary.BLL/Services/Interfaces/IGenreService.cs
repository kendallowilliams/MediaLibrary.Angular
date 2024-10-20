﻿using System.Threading.Tasks;

namespace MediaLibrary.BLL.Services.Interfaces
{
    public interface IGenreService
    {
        Task<int?> AddGenre(string genres);
    }
}
