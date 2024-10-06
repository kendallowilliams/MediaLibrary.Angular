import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { Track } from '@media-library/ml-data';
import { ModalRef } from '../../../modal';

@Component({
  selector: 'ml-edit-song-modal',
  templateUrl: './edit-song-modal.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditSongModalComponent {
  @Input({required: true}) public song!: Track;

  constructor(private mlModalRef: ModalRef<EditSongModalComponent>) {}

  public close() : void {
    this.mlModalRef.hide();
  }
}
