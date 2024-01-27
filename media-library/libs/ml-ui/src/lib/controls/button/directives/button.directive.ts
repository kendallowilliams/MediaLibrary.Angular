import { Directive, HostBinding, Input, OnInit } from '@angular/core';

export const BUTTON_VARIANTS = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'] as const;
export type ButtonVariant = typeof BUTTON_VARIANTS[number];

@Directive({
  selector: 'button[mlButton], a[mlButton]'
})
export class ButtonDirective implements OnInit {
  @HostBinding('class') private _class = '';
  @Input() public variant: ButtonVariant = 'primary';
  @HostBinding('attr.tabindex') private _tabIndex = 0;
  @HostBinding('attr.type') private _type = 'button';

  private _baseClasses = [
    'inline-flex',
    'items-center',
    'px-[10px]', 
    'h-control', 
    'm-0', 
    'outline-none', 
    'focus:ring',
    'rounded-[5px]',
    'disabled:pointer-events-none',
    'cursor-pointer',
    'select-none'
  ];

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
        'hover:[&:not(:disabled)]:bg-primary-hover',
        'active:[&:not(:disabled)]:bg-primary-active',
        'disabled:bg-primary-disabled',
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
        'hover:[&:not(:disabled)]:bg-secondary-hover',
        'active:[&:not(:disabled)]:bg-secondary-active',
        'disabled:bg-secondary-disabled',
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
        'hover:[&:not(:disabled)]:bg-success-hover',
        'active:[&:not(:disabled)]:bg-success-active',
        'disabled:bg-success-disabled',
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
        'hover:[&:not(:disabled)]:bg-danger-hover',
        'active:[&:not(:disabled)]:bg-danger-active',
        'disabled:bg-danger-disabled',
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
        'hover:[&:not(:disabled)]:bg-warning-hover',
        'active:[&:not(:disabled)]:bg-warning-active',
        'disabled:bg-warning-disabled',
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
        'hover:[&:not(:disabled)]:bg-info-hover',
        'active:[&:not(:disabled)]:bg-info-active',
        'disabled:bg-info-disabled',
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
        'hover:[&:not(:disabled)]:bg-light-hover',
        'active:[&:not(:disabled)]:bg-light-active',
        'disabled:bg-dark-disabled',
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
        'hover:[&:not(:disabled)]:bg-dark-hover',
        'active:[&:not(:disabled)]:bg-dark-active',
        'disabled:bg-dark-disabled',
        /** Ring */
        'focus:ring-dark-focus'
      ];
    }

    return classes.concat([...this._baseClasses]);
  };
}
