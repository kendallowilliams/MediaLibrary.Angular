﻿using System.IO;

namespace MediaLibrary.Shared.Models
{
    public class ScanDirectoryRequest
    {
        public ScanDirectoryRequest() { }

        public ScanDirectoryRequest(string path)
        {
            Path = path;
        }

        public ScanDirectoryRequest(string path, bool recursive) : this(path)
        {
            Recursive = recursive;
        }

        public string Path { get; set; }
        public bool Recursive { get; set; }

        public bool IsValid() => !string.IsNullOrWhiteSpace(Path) && Directory.Exists(Path);
    }
}