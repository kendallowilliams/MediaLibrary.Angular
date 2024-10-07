import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { Track } from '@media-library/ml-data';
import { ColDef, GridApi, GridOptions, GridReadyEvent, RowDataUpdatedEvent, RowGroupOpenedEvent } from '@ag-grid-community/core';
import { SongOptionsCellRendererComponent } from '../cell-renderers/song-options-cell-renderer/song-options-cell-renderer.component';

@Component({
  selector: 'ml-songs-grid',
  templateUrl: './songs-grid.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SongsGridComponent {
  @Input() public songs!: Track[] | null;

  @Output() public editSong = new EventEmitter<number>();
  @Output() public addToPlaylist = new EventEmitter<number>();

  private gridApi?: GridApi;
  public gridOptions: GridOptions<Track> = {
    onRowGroupOpened: this.onRowGroupOpened,
    alwaysMultiSort: true
  };
  public groupColDef: ColDef<Track> = {
    cellClass: ['font-bold'],
    cellRendererParams: {
      suppressCount: true
    }
  };
  public colDefs: ColDef<Track>[] = [
    {
      field: 'id',
      hide: true
    },
    {
      rowGroup: true,
      valueGetter: params => params.data?.title?.charAt(0)?.toUpperCase(),
      hide: true,
      sort: 'asc'
    },
    {
      field: 'title',
      sort: 'asc',
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
      cellRendererSelector: params => !params.node.group ? ({
        component: SongOptionsCellRendererComponent,
        params: {
          edit: () => this.editSong.emit(params.data?.id),
          addToPlaylist: () => this.addToPlaylist.emit(params.data?.id)
        }
      }) : undefined
      
    }
  ];

  public gridReady(evt: GridReadyEvent) : void {
    this.gridApi = evt.api;
  }

  public rowDataUpdated(evt: RowDataUpdatedEvent) : void {
    evt.api.forEachNode(rowNode => {
      if (rowNode.rowIndex === 0) {
        evt.api.setRowNodeExpanded(rowNode, rowNode.rowIndex === 0);
      }
  });
  }

  public onRowGroupOpened(evt: RowGroupOpenedEvent<Track>): void {
    if (evt.node.expanded) {
      evt.api.forEachNode(node => {
        if (node.group && node.key !== evt.node.key && node.expanded) {
          evt.api.setRowNodeExpanded(node, false);
        }
      });
    }
  }
}
