import { NgIf } from '@angular/common';
import { Directive, inject, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NavbarService } from '../../services/navbar.service';

@Directive({
  selector: '[mlHideIfNavLinksHidden]',
  hostDirectives: [{
    directive: NgIf
  }]
})
export class HideIfNavLinksHiddenDirective implements OnInit, OnDestroy {
  private _subscriptions?: Subscription[];
  private _ngIfDirective = inject(NgIf);

  constructor(private _navbarService: NavbarService) { }

  public ngOnInit(): void {
    this._subscriptions = [
      this._navbarService.getNavbarNavHidden$().subscribe(hidden => {
        this._ngIfDirective.ngIf = !hidden;
      })
    ];
  }

  public ngOnDestroy() : void {
    this._subscriptions?.forEach(subscription => subscription.unsubscribe());
  }
}
