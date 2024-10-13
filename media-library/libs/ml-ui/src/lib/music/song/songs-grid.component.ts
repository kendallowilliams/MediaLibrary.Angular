import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, OnChanges, Output, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { Album, Artist, Track, Genre, MediaPages } from '@media-library/ml-data';
import { ColDef, GridApi, GridOptions, GridReadyEvent, RowClassParams } from '@ag-grid-community/core';
import { SongOptionsCellRendererComponent } from '../cell-renderers/song-options-cell-renderer/song-options-cell-renderer.component';
import { PlayerService } from '../../media-player';

@Component({
  selector: 'ml-songs-grid',
  templateUrl: './songs-grid.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SongsGridComponent implements OnChanges {
  @HostBinding('class') private _class = 'block h-full';
  @Input() public songs!: Track[] | null;
  @Input() public artists!: Artist[] | null;
  @Input() public albums!: Album[] | null;
  @Input() public genres!: Genre[] | null;

  @Output() public editSong = new EventEmitter<number>();
  @Output() public addToPlaylist = new EventEmitter<number>();

  private gridApi?: GridApi<Track>;
  public gridOptions: GridOptions<Track> = {
    groupDisplayType: 'groupRows',
    alwaysMultiSort: true,
    defaultColDef: {
      filterParams: {
        maxNumConditions: 1,
        buttons: ['apply', 'reset', 'cancel']
      },
      enableRowGroup: true
    },
    rowGroupPanelShow: 'always',
    suppressRowGroupHidesColumns: true,
    suppressCellFocus: true,
    groupRowRendererParams: {
      suppressCount: true
    },
    rowClassRules: {
      'font-bold': (params: RowClassParams<Track>) => !!params.node.group
    },
    onRowDoubleClicked: evt => evt.data?.id && this._playerService.playAudio(MediaPages.Music, evt.data.id)
  };

  constructor(private _playerService: PlayerService) {}
  
  public ngOnChanges(changes: SimpleChanges): void {
    if ('genres' in changes) {
      this.gridApi?.refreshCells({columns: ['genre']});
    } 
    if ('albums' in changes) {
      this.gridApi?.refreshCells({columns: ['album']});
    }
    if ('artists' in changes) {
      this.gridApi?.refreshCells({columns: ['artist']});
    }
  }

  public gridReady(evt: GridReadyEvent) : void {
    this.gridApi = evt.api;
    this.gridApi?.setGridOption('columnDefs', this._getColDefs());
    this.gridApi?.addRowGroupColumns(['title']);
    console.clear();
  }

  private _getColDefs() : ColDef<Track>[] {
    return [
      {
        field: 'id',
        hide: true
      },
      {
        field: 'title',
        sort: 'asc',
        flex: 1,
        filter: true,
        keyCreator: params => {
          const firstChar = params.data?.title?.charAt(0).toUpperCase() || '';
          if (/^[A-z]$/.test(firstChar)) {
            return firstChar;
          }
          return '#';
        },
        comparator: (a, b) => a?.localeCompare(b)
      },
      {
        field: 'year',
        valueGetter: params => params.data?.year || null,
        valueFormatter: params => params.value || '--',
        filter: true,
        filterValueGetter: params => params.data?.year
      },
      {
        field: 'albumId',
        hide: true
      },
      {
        colId: 'album',
        headerName: 'Album',
        valueGetter: params => this.albums?.find(a => params.data?.albumId === a.id)?.title,
        filter: true,
        filterValueGetter: params => this.albums?.find(a => params.data?.albumId === a.id)?.title
      },
      {
        field: 'artistId',
        hide: true
      },
      {
        colId: 'artist',
        headerName: 'Artist',
        valueGetter: params => this.artists?.find(a => params.data?.artistId === a.id)?.name,
        filter: true,
        filterValueGetter: params => this.artists?.find(a => params.data?.artistId === a.id)?.name,
      },
      {
        field: 'genreId',
        hide: true
      },
      {
        colId: 'genre',
        headerName: 'Genre',
        valueGetter: params => this.genres?.find(g => params.data?.genreId === g.id)?.name || null,
        valueFormatter: params => params.value || '--',
        filter: true,
        filterValueGetter: params => this.genres?.find(g => params.data?.genreId === g.id)?.name || null
      },
      {
        cellRendererSelector: params => !params.node.group ? ({
          component: SongOptionsCellRendererComponent,
          params: {
            edit: () => this.editSong.emit(params.data?.id),
            addToPlaylist: () => this.addToPlaylist.emit(params.data?.id)
          }
        }) : undefined,
        enableRowGroup: false,
        suppressFiltersToolPanel: true,
        sortable: false
      }
    ];
  }

  public selectAlbum(album: string) : void {
    this.gridApi?.setFilterModel(null);
    this.gridApi?.setRowGroupColumns(['title']);
    this.gridApi?.applyColumnState({
      state: [
        { colId: 'album', sort: 'asc', sortIndex: 1 },
        { colId: 'title', sort: 'asc', sortIndex: 0 },
      ],
      defaultState: { sort: null },
    });
    this.gridApi?.setColumnFilterModel('album', { values: [album] })
      .then(() => this.gridApi?.onFilterChanged());
  }

  public selectArtist(artist: string) : void {
    this.gridApi?.setFilterModel(null);
    this.gridApi?.setRowGroupColumns(['title']);
    this.gridApi?.applyColumnState({
      state: [
        { colId: 'artist', sort: 'asc', sortIndex: 1 },
        { colId: 'title', sort: 'asc', sortIndex: 0 },
      ],
      defaultState: { sort: null },
    });
    this.gridApi?.setColumnFilterModel('artist', { values: [artist] })
      .then(() => this.gridApi?.onFilterChanged());
  }
}
