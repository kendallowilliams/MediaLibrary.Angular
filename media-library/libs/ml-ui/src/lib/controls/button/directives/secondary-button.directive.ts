import { Directive, Host, HostBinding, Input, OnInit } from '@angular/core';
import { ButtonVariant } from './button.directive';

@Directive({
  selector: 'button[mlSecondaryButton], a[mlSecondaryButton]'
})
export class SecondaryButtonDirective implements OnInit {
  @HostBinding('class') private _class = '';
  @Input() public variant: ButtonVariant = 'primary';
  @Input() public disabled = false;
  @HostBinding('attr.tabindex') private _tabIndex = 0;

  private _baseClasses = [
    'inline-flex',
    'items-center',
    'px-[10px]', 
    'h-control', 
    'm-0', 
    'outline-none', 
    'focus:ring',
    'rounded-[5px]',
    'content-box',
    'border-solid',
    'border-[1px]',
    'bg-transparent',
    'disabled:pointer-events-none',
    'select-none',
    'cursor-pointer'
  ];

  public ngOnInit(): void {
    this._class = this.getVariantClasses().join(' ');
  }

  private getVariantClasses() : string[] {
    let classes = new Array<string>();

    if (this.variant === 'primary') {
      classes = [
        /** Text */
        'text-primary',
        'hover:[:not(:disabled)]:text-light',
        /** Background */
        'hover:[:not(:disabled)]:bg-primary',
        /** Ring */
        'focus:ring-primary-focus',
        /** Border */
        'border-primary'
      ];
    } else if (this.variant === 'secondary') {
      classes = [
        /** Text */
        'text-secondary',
        'hover:[:not(:disabled)]:text-light',
        /** Background */
        'hover:[:not(:disabled)]:bg-secondary',
        /** Ring */
        'focus:ring-secondary-focus',
        /** Border */
        'border-secondary'
      ];
    } else if (this.variant === 'success') {
      classes = [
        /** Text */
        'text-success',
        'hover:[:not(:disabled)]:text-light',
        /** Background */
        'hover:[:not(:disabled)]:bg-success',
        /** Ring */
        'focus:ring-success-focus',
        /** Border */
        'border-success'
      ];
    } else if (this.variant === 'danger') {
      classes = [
        /** Text */
        'text-danger',
        'hover:[:not(:disabled)]:text-light',
        /** Background */
        'hover:[:not(:disabled)]:bg-danger',
        /** Ring */
        'focus:ring-danger-focus',
        /** Border */
        'border-danger'
      ];
    } else if (this.variant === 'warning') {
      classes = [
        /** Text */
        'text-warning',
        'hover:[:not(:disabled)]:text-light',
        /** Background */
        'hover:[:not(:disabled)]:bg-warning',
        /** Ring */
        'focus:ring-warning-focus',
        /** Border */
        'border-warning'
      ];
    } else if (this.variant === 'info') {
      classes = [
        /** Text */
        'text-info',
        'hover:[:not(:disabled)]:text-light',
        /** Background */
        'hover:[:not(:disabled)]:bg-info',
        /** Ring */
        'focus:ring-info-focus',
        /** Border */
        'border-info'
      ];
    } else if (this.variant === 'dark') {
      classes = [
        /** Text */
        'text-dark',
        'hover:[:not(:disabled)]:text-light',
        /** Background */
        'hover:[:not(:disabled)]:bg-dark',
        /** Ring */
        'focus:ring-dark-focus',
        /** Border */
        'border-dark'
      ];
    }

    return classes.concat([...this._baseClasses]);
  };
}
