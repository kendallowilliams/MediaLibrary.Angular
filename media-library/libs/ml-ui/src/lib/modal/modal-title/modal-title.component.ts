import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  ViewEncapsulation,
} from '@angular/core';

@Component({
    selector: 'ml-modal-title',
    templateUrl: './modal-title.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class ModalTitleComponent {
  @HostBinding('class') private _class = 'font-bold';
}
