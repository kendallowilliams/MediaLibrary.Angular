import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ElementRef,
  HostBinding,
  ViewEncapsulation,
} from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FaIconService } from '../../services/fa-icon/fa-icon.service';
import { CardFlyoutComponent } from './card-flyout/card-flyout.component';
import { v4 as uuidv4 } from 'uuid';
import { CardBodyComponent } from './card-body/card-body.component';

@Component({
  selector: 'ml-card',
  templateUrl: './card.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  private _defaultClasses = 'flex flex-none h-full relative p-[10px] shadow';
  @HostBinding('class') private _class = this._defaultClasses;
  @ContentChild(CardFlyoutComponent) protected flyout?: CardFlyoutComponent;
  @ContentChild(CardBodyComponent) protected cardBody?: CardBodyComponent;

  protected inputId = `i-${uuidv4()}`;
  protected angleDown?: IconDefinition;

  constructor(private _host: ElementRef, private _faIconService: FaIconService) {
    this.angleDown = this._faIconService.getIconDefinition('fas', 'angle-down');
  }
}
