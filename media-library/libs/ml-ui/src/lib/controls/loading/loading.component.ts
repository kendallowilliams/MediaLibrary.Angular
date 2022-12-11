import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FaIconService } from '../../services/fa-icon/fa-icon.service';
import { LoadingService } from '../../services/loading/loading.service';

@Component({
  selector: 'ml-loading',
  templateUrl: './loading.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingComponent {
  @ViewChild('dialog') private _dialog?: ElementRef;
  private _numberOfProcesses = 0;

  protected faIcon?: IconDefinition;

  constructor(private _faIconService: FaIconService, private _loadingService: LoadingService) {
    this.faIcon = this._faIconService.getIconDefinition('fas', 'spinner');
    this._loadingService.getLoading$().subscribe(loading => this._toggleLoading(loading));
  }

  private _toggleLoading(loading: boolean) : void {
    const dialog = this._dialog?.nativeElement as HTMLDialogElement;

    if (loading) {
      this._numberOfProcesses++;
      dialog.showModal();
    } else {
      this._numberOfProcesses--;

      if (this._numberOfProcesses <= 0) {
        dialog.close();
      }
    }
  }
}
