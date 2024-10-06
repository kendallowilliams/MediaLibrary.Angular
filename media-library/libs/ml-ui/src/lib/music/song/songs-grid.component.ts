import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { Track } from '@media-library/ml-data';
import { ColDef, GridOptions } from '@ag-grid-community/core';
import { SongOptionsCellRendererComponent } from '../cell-renderers/song-options-cell-renderer/song-options-cell-renderer.component';

@Component({
  selector: 'ml-songs-grid',
  templateUrl: './songs-grid.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SongsGridComponent {
  @Input() public songs!: Track[] | null;

  public gridOptions: GridOptions<Track> = {
    groupRowRendererParams: {
      suppressCount: true
    }
  };
  public groupColDef: ColDef<Track> = {
  };
  public colDefs: ColDef<Track>[] = [
    {
      field: 'id',
      hide: true
    },
    {
      field: 'title',
      hide: true,
      rowGroup: true,
      valueGetter: params => params.data?.title?.charAt(0)?.toUpperCase(),
      sort: 'asc'
    },
    {
      field: 'title',
      flex: 1
    },
    {
      field: 'year',
      valueGetter: params => params.data?.year || ''
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
    },
    {
      cellRenderer: SongOptionsCellRendererComponent,
      valueGetter: params => params.data
    }
  ];
}
