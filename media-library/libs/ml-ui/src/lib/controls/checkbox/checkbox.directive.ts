import { Directive, ElementRef, HostBinding, Input, OnInit, Renderer2 } from '@angular/core';
import { FaIconService } from '../../services/fa-icon/fa-icon.service';

@Directive({
  selector: 'input[mlCheckbox]'
})
export class CheckboxDirective implements OnInit {
  private _labelClasses = ['flex', 'items-center', 'select-none', 'gap-[5px]', 'leading-[20px]', 'p-0', 'm-0', 'text-inherit', 'dark:text-inherit'];
  private _iconClasses = ['flex', 'items-center', 'bg-dark', 'text-transparent', 'peer-checked:text-light', 
    'dark:bg-secondary', 'dark:text-secondary', 'dark:peer-checked:text-light', 
    'rounded-[3px]', 'border-[0.5px]', 'border-dark', 'dark:border-secondary', 'w-[15px]', 'h-[15px]',
    'box-content' ];
  @HostBinding('class') private _class = 'hidden peer appearance-none';

  @Input() public labelText = 'Checkbox Label';

  constructor(private _host: ElementRef, private _faIconService: FaIconService, private _renderer: Renderer2) { }

  public ngOnInit(): void {
    const input = this._host.nativeElement as HTMLInputElement;

    input.type = 'checkbox';
    this._initializeCheckbox(input);
  }

  private _initializeCheckbox(input: HTMLInputElement) : void {
    const label = this._renderer.createElement('label') as HTMLLabelElement,
      divLabel = this._renderer.createElement('div') as HTMLSpanElement,
      faIcon = this._faIconService.getIcon('fas', 'check', { classes: 'h-full w-full' }),
      divIcon = this._renderer.createElement('div') as HTMLSpanElement;

    divLabel.textContent = this.labelText;
    this._renderer.appendChild(divIcon, faIcon?.node[0])
    this._labelClasses.forEach(labelClass => this._renderer.addClass(label, labelClass));
    this._iconClasses.forEach(iconClass => this._renderer.addClass(divIcon, iconClass));
    this._renderer.insertBefore(this._renderer.parentNode(input), label, input);
    this._renderer.appendChild(label, input);
    this._renderer.appendChild(label, divIcon);
    this._renderer.appendChild(label, divLabel);
  }
}
