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
    this._renderer.addClass(this._host.nativeElement, 'ml-valid');
    this._renderer.removeClass(this._host.nativeElement, 'ml-invalid');
  }

  private _setInvalid() : void {
    this._renderer.addClass(this._host.nativeElement, 'ml-invalid');
    this._renderer.removeClass(this._host.nativeElement, 'ml-valid');
  }
}