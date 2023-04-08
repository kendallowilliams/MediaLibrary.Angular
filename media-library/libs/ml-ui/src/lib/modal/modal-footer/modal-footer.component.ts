import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'ml-modal-footer',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalFooterComponent {
  @HostBinding('class') private _class = `flex items-center h-[50px] 
    border-secondary border-solid border-t-[1px] px-[30px]`;
}
