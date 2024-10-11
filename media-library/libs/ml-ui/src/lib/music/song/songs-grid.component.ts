import { ChangeDetectionStrategy, Component, DestroyRef, EventEmitter, HostBinding, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { Album, Artist, Track, Genre } from '@media-library/ml-data';
import { ColDef, FilterChangedEvent, GridApi, GridOptions, GridReadyEvent, RowDataUpdatedEvent, RowGroupOpenedEvent } from '@ag-grid-community/core';
import { SongOptionsCellRendererComponent } from '../cell-renderers/song-options-cell-renderer/song-options-cell-renderer.component';
import { MlFilter, MlFilterService } from '@media-library/ml-utility';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';

@Component({
  selector: 'ml-songs-grid',
  templateUrl: './songs-grid.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SongsGridComponent implements OnInit {
  @HostBinding('class') private _class = 'block h-full';
  @Input() public songs!: Track[] | null;
  @Input() public artists!: Artist[] | null;
  @Input() public albums!: Album[] | null;
  @Input() public genres!: Genre[] | null;

  @Output() public editSong = new EventEmitter<number>();
  @Output() public addToPlaylist = new EventEmitter<number>();

  private _filters: MlFilter[] = [];
  private gridApi?: GridApi<Track>;
  public gridOptions: GridOptions<Track> = {
    onRowGroupOpened: this.onRowGroupOpened,
    alwaysMultiSort: true,
    groupDisplayType: 'singleColumn',
    defaultColDef: {
      filterParams: {
        maxNumConditions: 1,
        buttons: ['apply', 'reset', 'cancel']
      }
    }
  };
  public groupColDef: ColDef<Track> = {
    headerName: 'A-Z',
    cellClass: ['font-bold'],
    cellRendererParams: {
      suppressCount: true
    }
  };

  constructor(private _filterService: MlFilterService, private _destroyRef: DestroyRef) {}

  public ngOnInit(): void {
    this._filterService.getFilters()
      .pipe(
        takeUntilDestroyed(this._destroyRef),
        tap(filters => {
          this._filters = filters;
          this.gridApi?.setGridOption('columnDefs', this._getColDefs());
          this.gridApi?.setFilterModel(null);
          this._filters.forEach(filter => this.gridApi?.setColumnFilterModel(filter.name, {
            values: [filter.value]
          }));
          this.gridApi?.onFilterChanged();
        })
      )
      .subscribe();
  }

  private _getColDefs() : ColDef<Track>[] {
    return [
      {
        field: 'id',
        hide: true
      },
      {
        rowGroup: this._filters.length === 0,
        hide: true,
        sort: 'asc',
        keyCreator: params => params.value,
        valueGetter: params => {
          const firstChar = params.data?.title?.charAt(0).toUpperCase() || '';
          if (/^[A-z]$/.test(firstChar)) {
            return firstChar;
          }
          return '#';
        }
      },
      {
        field: 'title',
        sort: 'asc',
        flex: 1,
        filter: true
      },
      {
        field: 'year',
        valueGetter: params => params.data?.year || null,
        valueFormatter: params => params.node?.group ? '' : params.value || '--',
        filter: true,
        filterValueGetter: params => params.data?.year || null
      },
      {
        field: 'albumId',
        hide: true,
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
        hide: true,
      },
      {
        colId: 'genre',
        headerName: 'Genre',
        valueGetter: params => this.genres?.find(g => params.data?.genreId === g.id)?.name,
        filter: true,
        filterValueGetter: params => this.genres?.find(g => params.data?.genreId === g.id)?.name
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
  }

  public gridReady(evt: GridReadyEvent) : void {
    this.gridApi = evt.api;
    this.gridApi?.setGridOption('columnDefs', this._getColDefs());
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

  public filterChanged(evt: FilterChangedEvent) : void {
    evt.api.getDisplayedRowAtIndex(0)?.setExpanded(true);
  }
}
