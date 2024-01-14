import { DestroyRef, Directive, ElementRef, OnInit, Renderer2 } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { NgControl } from "@angular/forms";

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: `
    ml-select[formControlName],
    ml-select[ngModel]
  `
})
export class ControlValidatorDirective implements OnInit {
  private validClass = 'ml-valid';
  private invalidClass = 'ml-invalid';

  constructor(
    private _control: NgControl, 
    private _destroyRef: DestroyRef, 
    private _host: ElementRef<HTMLElement>,
    private _renderer: Renderer2
  ) {}
  
  public ngOnInit(): void {
    this._setValid();
    this._control.statusChanges
      ?.pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(() => {
        if (this._control.valid) {
          this._setValid();
        } else {
          this._setInvalid();
        }
      });
  }

  private _setValid() : void {
    this._renderer.addClass(this._host.nativeElement, this.validClass);
    this._renderer.removeClass(this._host.nativeElement, this.invalidClass);
  }

  private _setInvalid() : void {
    this._renderer.addClass(this._host.nativeElement, this.invalidClass);
    this._renderer.removeClass(this._host.nativeElement, this.validClass);
  }
}