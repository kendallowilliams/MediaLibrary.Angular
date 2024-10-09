import { ChangeDetectionStrategy, Component, DestroyRef, EventEmitter, HostBinding, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { Album, Artist, Track, Genre } from '@media-library/ml-data';
import { ColDef, FilterChangedEvent, GridApi, GridOptions, GridReadyEvent, IRowNode, RowDataUpdatedEvent, RowGroupOpenedEvent } from '@ag-grid-community/core';
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

  private gridApi?: GridApi;
  public gridOptions: GridOptions<Track> = {
    onRowGroupOpened: this.onRowGroupOpened,
    alwaysMultiSort: true
  };
  public groupColDef: ColDef<Track> = {
    headerName: '',
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
      valueFormatter: params => params.node?.group ? '' : (params.value || '--')
    },
    {
      field: 'albumId',
      headerName: 'Album',
      valueGetter: params => this.albums?.find(a => params.data?.albumId === a.id)?.title
    },
    {
      field: 'artistId',
      headerName: 'Artist',
      valueGetter: params => this.artists?.find(a => params.data?.artistId === a.id)?.name
    },
    {
      field: 'genreId',
      headerName: 'Genre',
      valueGetter: params => this.genres?.find(g => params.data?.genreId === g.id)?.name
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
  private _filters: MlFilter[] = [];

  constructor(private _filterService: MlFilterService, private _destroyRef: DestroyRef) {}

  public ngOnInit(): void {
    this._filterService.getFilters()
      .pipe(
        takeUntilDestroyed(this._destroyRef),
        tap(filters => {
          this._filters = filters;
          this.gridApi?.onFilterChanged();
        })
      )
      .subscribe();
  }

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

  public filterChanged(evt: FilterChangedEvent) : void {
    evt.api.getDisplayedRowAtIndex(0)?.setExpanded(true);
  }

  public isExternalFilterPresent = (/*params: IsExternalFilterPresentParams*/) : boolean => {
    return this._filters.length > 0;
  }

  public doesExternalFilterPass = (rowNode: IRowNode<Track>) : boolean => {
    return this._filterService.isMatch('albumId', rowNode.data?.albumId) &&
      this._filterService.isMatch('artistId', rowNode.data?.artistId);
  }
}
