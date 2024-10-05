import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { Track } from '@media-library/ml-data';
import { ColDef } from 'ag-grid-community';

@Component({
  selector: 'ml-songs-grid',
  templateUrl: './songs-grid.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SongsGridComponent {
  @Input() public songs!: Track[] | null;

  public colDefs: ColDef<Track>[] = [
    {
      field: 'id',
      hide: true
    },
    {
      field: 'title',
      flex: 1
    },
    {
      field: 'year'
    },
    {
      field: 'album.title',
      headerName: 'Album'
    },
    {
      field: 'artist.name',
      headerName: 'Artist'
    },
    {
      field: 'genre.name',
      headerName: 'Genre'
    }
  ];
}
