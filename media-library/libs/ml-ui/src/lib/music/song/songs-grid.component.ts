import { Component, EventEmitter, HostBinding, Input, OnChanges, Output, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { Album, Artist, Track, Genre, MediaPages } from '@media-library/ml-data';
import { ColDef, FilterChangedEvent, GridApi, GridOptions, GridReadyEvent, GridState, KeyCreatorParams, RowClassParams, ValueFormatterParams } from '@ag-grid-community/core';
import { SongOptionsCellRendererComponent } from '../cell-renderers/song-options-cell-renderer/song-options-cell-renderer.component';
import { PlayerService } from '../../media-player';
import { IconCellRendererComponent } from '../cell-renderers/icon-cell-renderer/icon-cell-renderer.component';
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons';
import { debounceTime, fromEvent } from 'rxjs';

@Component({
  selector: 'ml-songs-grid',
  templateUrl: './songs-grid.component.html',
  encapsulation: ViewEncapsulation.None
})
export class SongsGridComponent implements OnChanges {
  @HostBinding('class') private _class = 'block h-full';
  @Input() public songs!: Track[] | null;
  @Input() public artists!: Artist[] | null;
  @Input() public albums!: Album[] | null;
  @Input() public genres!: Genre[] | null;

  @Output() public editSong = new EventEmitter<number>();
  @Output() public addToPlaylist = new EventEmitter<number>();

  private _gridState?: GridState;
  private gridApi?: GridApi<Track>;
  private _colDefs: ColDef<Track>[] = [
    {
      field: 'id',
      headerName: '',
      cellRenderer: IconCellRendererComponent,
      cellRendererParams: {
        icon: faPlayCircle
      },
      enableRowGroup: false,
      sortable: false,
      filter: false
    },
    {
      field: 'title',
      sort: 'asc',
      flex: 1,
      keyCreator: params => {
        const firstChar = params.value.charAt(0).toUpperCase() || '';
        if (/^[A-z]$/.test(firstChar)) {
          return firstChar;
        } else if (/^[0-9]$/.test(firstChar)) {
          return '#';
        }
        return '&';
      },
      comparator: (a, b) => a?.localeCompare(b),
      filterParams: {
        keyCreator: (params: KeyCreatorParams) => params.value,
        valueFormatter: (params: ValueFormatterParams) => !params.node?.group && params.value
      }
    },
    {
      field: 'year',
      valueGetter: params => params.data?.year || null,
      valueFormatter: params => params.value || '--',
      filterValueGetter: params => params.data?.year || null
    },
    {
      field: 'albumId',
      hide: true,
      filter: false
    },
    {
      colId: 'album',
      headerName: 'Album',
      valueGetter: params => this.albums?.find(a => params.data?.albumId === a.id)?.title,
      valueFormatter: params => params.value || '--',
      filterValueGetter: params => this.albums?.find(a => params.data?.albumId === a.id)?.title
    },
    {
      field: 'artistId',
      hide: true,
      filter: false
    },
    {
      colId: 'artist',
      headerName: 'Artist',
      valueGetter: params => this.artists?.find(a => params.data?.artistId === a.id)?.name,
      valueFormatter: params => params.value || '--',
      filterValueGetter: params => this.artists?.find(a => params.data?.artistId === a.id)?.name,
    },
    {
      field: 'genreId',
      hide: true,
      filter: false
    },
    {
      colId: 'genre',
      headerName: 'Genre',
      valueGetter: params => this.genres?.find(g => params.data?.genreId === g.id)?.name || null,
      valueFormatter: params => params.value || '--',
      filterValueGetter: params => this.genres?.find(g => params.data?.genreId === g.id)?.name || null
    },
    {
      colId: 'actions',
      cellRendererSelector: params => !params.node.group ? ({
        component: SongOptionsCellRendererComponent,
        params: {
          edit: () => this.editSong.emit(params.data?.id),
          addToPlaylist: () => this.addToPlaylist.emit(params.data?.id)
        }
      }) : undefined,
      enableRowGroup: false,
      suppressFiltersToolPanel: true,
      sortable: false,
      filter: false
    }
  ];
  public gridOptions: GridOptions<Track> = {
    columnDefs: this._colDefs,
    groupDisplayType: 'groupRows',
    alwaysMultiSort: true,
    defaultColDef: {
      filterParams: {
        buttons: ['apply', 'reset', 'cancel']
      },
      enableRowGroup: true,
      filter: true,
      lockPinned: true,
    },
    rowGroupPanelShow: 'always',
    suppressRowGroupHidesColumns: true,
    suppressCellFocus: true,
    groupRowRenderer: undefined,
    groupRowRendererParams: {
      suppressCount: true
    },
    rowClassRules: {
      'font-bold': (params: RowClassParams<Track>) => !!params.node.group
    },
    onRowDoubleClicked: evt => evt.data?.id && this._playerService.playAudio(MediaPages.Music, evt.data.id),
    onRowGroupOpened: evt => evt.node.expanded && this._autoSizeColumns(),
    onStateUpdated: evt => this._gridState = evt.state,
    onFilterChanged: (/*evt: FilterChangedEvent<Track>*/) => this._autoSizeColumns()
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
    this.gridApi?.addRowGroupColumns(['title']);
    this._autoSizeColumns();
    fromEvent(window, 'resize')
      .pipe(debounceTime(100))
      .subscribe();
    console.clear();
  }

  private _autoSizeColumns() : void {
    const cols = this.gridApi?.getColumns()?.map(col => col.getColId()) || [];
    this.gridApi?.autoSizeColumns(cols.filter(col => !['title'].includes(col)));
  }

  public selectAlbum(album: string) : void {
    this.gridApi?.setFilterModel(null);
    this._removeRowColumnGroups();
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
    this._removeRowColumnGroups();
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

  private _removeRowColumnGroups() : void {
    const groupColIds = this.gridApi?.getColumns()?.filter(col => col.isAllowRowGroup).map(col => col.getColId());
    this.gridApi?.removeRowGroupColumns(groupColIds || []);
  }
}
