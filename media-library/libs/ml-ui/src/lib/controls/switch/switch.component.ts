import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  Input,
  OnInit,
  Renderer2,
  RendererStyleFlags2,
  ViewEncapsulation,
  forwardRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { noop } from 'rxjs';

@Component({
  selector: 'ml-switch',
  templateUrl: './switch.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.Default,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SwitchComponent),
    multi: true
  }]
})
export class SwitchComponent implements ControlValueAccessor, OnInit {
  @HostBinding('class') private _class = `inline-flex items-center gap-[5px]`;
  @Input() public offLabel = '';
  @Input() public onLabel = '';

  private _onChange: (_: boolean) => void = noop;
  private _onTouched: () => void = noop;

  private _isDisabled = false;
  public checked = false;

  constructor(private _renderer: Renderer2, private _host: ElementRef) {}
  
  public ngOnInit(): void {
    this._renderer.setStyle(this._host.nativeElement, '--ml-switch-on-label', this.onLabel, RendererStyleFlags2.DashCase);
    this._renderer.setStyle(this._host.nativeElement, '--ml-switch-off-label', this.offLabel, RendererStyleFlags2.DashCase);
  }

  public writeValue(checked: boolean): void {
    this.checked = checked;
    this._onChange(checked);
  }

  public registerOnChange(fn: (_: boolean) => void): void {
    this._onChange = fn;
  }

  public registerOnTouched(fn: never): void {
    this._onTouched = fn;
  }

  public setDisabledState?(isDisabled: boolean): void {
    this._isDisabled = isDisabled;
  }

  public handleChange(isChecked: boolean) : void {
    this.writeValue(isChecked);
  }
}
