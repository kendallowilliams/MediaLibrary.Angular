using MediaLibrary.Shared.Models.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;

namespace MediaLibrary.Shared.Models
{
    public class DirectoryModel
    {
        public DirectoryModel()
        {
            SubDirectories = Enumerable.Empty<DirectoryModel>();
        }

        public string Name { get; set; }

        public string Path { get; set; }

        public IEnumerable<DirectoryModel> SubDirectories { get; set; }
    }
}