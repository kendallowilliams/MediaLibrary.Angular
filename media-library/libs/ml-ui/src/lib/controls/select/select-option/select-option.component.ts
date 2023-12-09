import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  ViewEncapsulation,
  EventEmitter,
  OnInit,
  DestroyRef
} from '@angular/core';
import { SelectOption } from '../interfaces/SelectOption.interface';
import { SelectComponent } from '../select.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'ml-select-option',
  templateUrl: './select-option.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectOptionComponent<T> implements SelectOption<T>, OnInit {
  @HostBinding('class') private _class = `block`;
  @Input() public value!: T;

  public optionClicked = new EventEmitter<SelectOption<T>>();
  public selected = false;
  
  public get text() {
    return (this._host.nativeElement.innerText || '').trim();
  }

  constructor(private _host: ElementRef<HTMLElement>, private _select: SelectComponent<T>, private _destroyRef: DestroyRef) {}
  
  public ngOnInit(): void {
    this._select.valueChange
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: value => {
          if (!value || this.value !== value) {
            this.selected = false;
          } else if (!this.selected && this.value === value) {
            this.selected = true;
          }
        }
      });
  }

  @HostListener('click')
  private _handleClick() : void {
    if (!this.selected) {
      this.selected = true;
      this._select.select(this);
      this._select.writeValue(this.value);
    } else {
      this._select.closeDropdown();
    }

    this.optionClicked.next(this);
  }
}
