import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  ViewEncapsulation,
  EventEmitter,
  OnDestroy
} from '@angular/core';
import { SelectOption } from '../interfaces/SelectOption.interface';

@Component({
  selector: 'ml-select-option',
  templateUrl: './select-option.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectOptionComponent<T> implements SelectOption<T>, OnDestroy {
  @HostBinding('class') private _class = `block`;
  @Input() public value!: T;

  public optionClicked = new EventEmitter<SelectOption<T>>();
  public selected = false;
  
  public get text() {
    return (this._host.nativeElement.innerText || '').trim();
  }

  constructor(private _host: ElementRef<HTMLElement>) {}
  
  public ngOnDestroy(): void {
    this.optionClicked.unsubscribe();
  }

  @HostListener('click')
  private _handleClick() : void {
    this.optionClicked.next(this);
  }
}
