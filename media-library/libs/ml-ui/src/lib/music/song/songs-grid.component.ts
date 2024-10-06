import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { Track } from '@media-library/ml-data';
import { ColDef, GridOptions, RowGroupOpenedEvent } from '@ag-grid-community/core';
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

  public isEditModalOpen = false;
  public isAddToPlaylistModalOpen = false;
  public selectedSong?: Track;
  public gridOptions: GridOptions<Track> = {
    onRowGroupOpened: this.onRowGroupOpened,
    alwaysMultiSort: true
  };
  public groupColDef: ColDef<Track> = {
    cellRendererParams: {
      suppressCount: true,
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
          edit: () => this.showEditModal(params.data),
          addToPlaylist: () => this.showAddToPlaylistModal(params.data?.id)
        }
      }) : undefined
      
    }
  ];

  public onRowGroupOpened(evt: RowGroupOpenedEvent<Track>): void {
    if (evt.node.expanded) {
      evt.api.forEachNode(node => {
        if (node.group && node.key !== evt.node.key) {
          evt.api.setRowNodeExpanded(node, false);
        }
      });
    }
  }

  public showEditModal(track?: Track) : void {
    this.isEditModalOpen = !!track;
    this.selectedSong = track;
  }

  public showAddToPlaylistModal(id?: number) : void {
    this.isAddToPlaylistModalOpen = !!id;
  }
}
