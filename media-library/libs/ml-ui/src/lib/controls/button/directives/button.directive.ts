import { Directive, ElementRef, HostBinding, Input, OnInit, Renderer2 } from '@angular/core';

export const BUTTON_VARIANTS = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'] as const;
export type ButtonVariant = typeof BUTTON_VARIANTS[number];

@Directive({
  selector: 'button[mlButton], a[mlButton]'
})
export class ButtonDirective implements OnInit {
  @HostBinding('class') private _class = '';
  @Input() public variant: ButtonVariant = 'primary';

  private _baseClasses = [
    'px-[10px]', 
    'h-[30px]', 
    'm-0', 
    'outline-none', 
    'focus:ring',
    'rounded-[5px]'
  ];

  constructor(private _host: ElementRef<HTMLButtonElement>, private _renderer: Renderer2) { }

  public ngOnInit(): void {
    this._class = this.getVariantClasses().join(' ');
  }

  private getVariantClasses() : string[] {
    let classes = new Array<string>();

    if (this.variant === 'primary') {
      classes = [
        /** Text */
        'text-light',
        /** Background */
        'bg-primary',
        'dark:bg-primary-dark',
        'hover:bg-primary-hover',
        'active:bg-primary-active',
        /** Ring */
        'focus:ring-primary-focus'
      ];
    } else if (this.variant === 'secondary') {
      classes = [
        /** Text */
        'text-light',
        /** Background */
        'bg-secondary',
        'dark:bg-secondary-dark',
        'hover:bg-secondary-hover',
        'active:bg-secondary-active',
        /** Ring */
        'focus:ring-secondary-focus'
      ];
    } else if (this.variant === 'success') {
      classes = [
        /** Text */
        'text-light',
        /** Background */
        'bg-success',
        'dark:bg-success-dark',
        'hover:bg-success-hover',
        'active:bg-success-active',
        /** Ring */
        'focus:ring-success-focus'
      ];
    } else if (this.variant === 'danger') {
      classes = [
        /** Text */
        'text-light',
        /** Background */
        'bg-danger',
        'dark:bg-danger-dark',
        'hover:bg-danger-hover',
        'active:bg-danger-active',
        /** Ring */
        'focus:ring-danger-focus'
      ];
    } else if (this.variant === 'warning') {
      classes = [
        /** Text */
        'text-dark',
        /** Background */
        'bg-warning',
        'dark:bg-warning-dark',
        'hover:bg-warning-hover',
        'active:bg-warning-active',
        /** Ring */
        'focus:ring-warning-focus'
      ];
    } else if (this.variant === 'info') {
      classes = [
        /** Text */
        'text-dark',
        /** Background */
        'bg-info',
        'dark:bg-info-dark',
        'hover:bg-info-hover',
        'active:bg-info-active',
        /** Ring */
        'focus:ring-info-focus'
      ];
    } else if (this.variant === 'light') {
      classes = [
        /** Text */
        'text-light',
        /** Background */
        'bg-light',
        'dark:bg-light-dark',
        'hover:bg-light-hover',
        'active:bg-light-active',
        /** Ring */
        'focus:ring-light-focus'
      ];
    } else if (this.variant === 'dark') {
      classes = [
        /** Text */
        'text-light',
        /** Background */
        'bg-dark',
        'dark:bg-dark-dark',
        'hover:bg-dark-hover',
        'active:bg-dark-active',
        /** Ring */
        'focus:ring-dark-focus'
      ];
    }

    return classes.concat([...this._baseClasses]);
  };
}
