import { Album, AlbumSort, Artist, ArtistSort } from "@media-library/ml-data";

export function sortAlbums(sort: AlbumSort = AlbumSort.AtoZ, albums: Album[]) : Album[] {
  if (sort === AlbumSort.AtoZ) {
    return [...albums].sort((a, b) => a.title.localeCompare(b.title));
  }

  return albums;
}

export function sortArtists(sort: ArtistSort = ArtistSort.AtoZ, artists: Artist[]) : Artist[] {
  if (sort === ArtistSort.AtoZ) {
    return [...artists].sort((a, b) => a.name.localeCompare(b.name));
  }

  return artists;
}