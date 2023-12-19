import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
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
  @HostBinding('class') private _class = 'flex items-center justify-center';
  @ViewChild('switch') private _input!: ElementRef;

  public id = `ml-switch-${Math.random().toString(36).substring(2)}`;

  @Input() public checked = false;
  @Output() public checkedChange = new EventEmitter<boolean>();

  @HostListener('click', ['$event'])
  private _handleClick(event: MouseEvent) : void {
    event.stopPropagation();
    this.checked = this._input.nativeElement.checked;
    this.checkedChange.emit(this.checked);
  }
}
