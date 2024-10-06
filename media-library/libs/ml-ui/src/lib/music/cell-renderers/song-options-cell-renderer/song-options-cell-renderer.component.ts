import { ICellRendererAngularComp } from '@ag-grid-community/angular';
import { ICellRendererParams } from '@ag-grid-community/core';
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { faEdit, faPlus } from '@fortawesome/free-solid-svg-icons';

export interface SongOptionParams extends ICellRendererParams {
  edit: () => void;
  addToPlaylist: () => void;
}

@Component({
  selector: 'ml-song-options-cell-renderer',
  templateUrl: './song-options-cell-renderer.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SongOptionsCellRendererComponent implements ICellRendererAngularComp {
  public faEdit = faEdit;
  public faPlus = faPlus;
  public params?: SongOptionParams;

  public agInit(params: SongOptionParams): void {
    this.params = params;
  }

  public refresh(/*params: ICellRendererParams<Track>*/): boolean {
    return true;
  }

  public edit() : void {
    this.params?.edit();
  }

  public addToPlaylist() : void {
    this.params?.addToPlaylist();
  }
}
