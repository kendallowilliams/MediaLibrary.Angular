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
import { CardBodyComponent } from './card-body/card-body.component';

@Component({
  selector: 'ml-card',
  templateUrl: './card.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  private _defaultClasses = 'flex flex-col flex-none h-full relative p-[10px] shadow';
  @HostBinding('class') private _class = this._defaultClasses;
  @ContentChild(CardBodyComponent) protected cardBody?: CardBodyComponent;

  protected angleDown?: IconDefinition;

  constructor(private _host: ElementRef, private _faIconService: FaIconService) {
    this.angleDown = this._faIconService.getIconDefinition('fas', 'angle-down');
  }
}
