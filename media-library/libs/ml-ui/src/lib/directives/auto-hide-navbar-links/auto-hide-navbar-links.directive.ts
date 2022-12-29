import { Directive, inject, NgZone, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { NavbarService } from '../../navbar/services/navbar.service';
import { UpdateIfLargerThanParentDirective } from '../update-if-larger-than-parent/update-if-larger-than-parent.directive';

@Directive({
  selector: '[mlAutoHideNavbarLinks]',
  hostDirectives: [UpdateIfLargerThanParentDirective],
  standalone: true
})
export class AutoHideNavbarLinksDirective implements OnDestroy {
  private _subscription?: Subscription;
  private _hostDirective = inject(UpdateIfLargerThanParentDirective);

  constructor(private _navbarService: NavbarService, private _ngZone: NgZone) {
    this._hostDirective.ignoreHeight = true;
    this._hostDirective.observeParentResize = true;
    this._hostDirective.targetName = 'hidden';
    this._hostDirective.updateTarget = 'class'
    this._subscription = this._hostDirective.updateCallback.subscribe(this._handleUpdate.bind(this));
  }
  
  public ngOnDestroy(): void {
    this._subscription?.unsubscribe();
  }

  private _handleUpdate(hidden: boolean) : void {
    this._ngZone.run(() => {
      this._navbarService.getNavbarNavHidden$().next(hidden);
      this._navbarService.getNavbarMenuOpen$().next(false);
    });
  }
}
