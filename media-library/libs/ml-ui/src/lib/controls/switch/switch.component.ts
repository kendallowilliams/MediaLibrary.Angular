import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'ml-switch',
  templateUrl: './switch.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SwitchComponent {
  @ViewChild('switch') private _input!: ElementRef;

  @Input() public checked = false;
  @Output() protected checkedChange = new EventEmitter<boolean>();

  @HostListener('click', ['$event'])
  private _handleClick(event: MouseEvent) : void {
    this.checked = this._input.nativeElement.checked;
    this.checkedChange.emit(this.checked);
  }
}
