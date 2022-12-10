import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { IconDefinition, IconName } from '@fortawesome/fontawesome-svg-core';
import { FaIconService } from '../../../services/fa-icon/fa-icon.service';

@Component({
  selector: 'ml-navbar-icon',
  templateUrl: './navbar-icon.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarIconComponent implements OnInit {
  private defaultClasses = 'hover:text-info-300 dark:hover:text-info-300 cursor-pointer';
  @HostBinding('class') private _class = this.defaultClasses;

  @Input() public iconName?: IconName;

  protected faIcon?: IconDefinition;

  constructor(private _faIconService: FaIconService) {
  }

  public ngOnInit(): void {
    if (this.iconName) {
      this.faIcon = this._faIconService.getIconDefinition('fas', this.iconName) || undefined;
    }
  }
}
