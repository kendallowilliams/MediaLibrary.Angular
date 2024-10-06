import { ICellRendererAngularComp } from '@ag-grid-community/angular';
import { ICellRendererParams } from '@ag-grid-community/core';
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { faEdit, faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'ml-song-options-cell-renderer',
  templateUrl: './song-options-cell-renderer.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SongOptionsCellRendererComponent implements ICellRendererAngularComp {
  public faEdit = faEdit;
  public faPlus = faPlus;

  public agInit(params: ICellRendererParams<any, any, any>): void {
  }

  public refresh(params: ICellRendererParams<any, any, any>): boolean {
    return true;
  }
}
