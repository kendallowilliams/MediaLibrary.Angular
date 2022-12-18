import { Directive, ElementRef, HostBinding, Input } from '@angular/core';

@Directive({
  selector: 'button[mlButton]'
})
export class ButtonDirective {
  @HostBinding('class') private _class = 'px-[10px] py-[5px] m-0';

  @Input() public variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';

  constructor(private _host: ElementRef<HTMLButtonElement>) { }
}
