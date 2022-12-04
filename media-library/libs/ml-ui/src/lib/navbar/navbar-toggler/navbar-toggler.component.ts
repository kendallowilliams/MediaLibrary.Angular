import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  Output,
  ViewEncapsulation,
  EventEmitter,
  Input,
  ChangeDetectorRef,
  HostBinding,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FaIconService } from '../../services/fa-icon/fa-icon.service';

@Component({
  selector: 'ml-navbar-toggler',
  templateUrl: './navbar-toggler.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarTogglerComponent implements OnChanges {
  @HostBinding('class') private _class = 'block lg:hidden';

  @Input() public menuOpen = false;
  @Output() public menuOpenChange = new EventEmitter<boolean>();

  protected faIcon?: IconDefinition;

  constructor(private _faIconService: FaIconService, private _cd: ChangeDetectorRef) {
    this._setIcon();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['menuOpen']) {
      this._setIcon();
    }
  }

  @HostListener('click', ['$event'])
  private _handleClick(event: MouseEvent) : void {
    this.menuOpen = !this.menuOpen;
    this.menuOpenChange.emit(this.menuOpen);
    this._setIcon();
  }

  private _setIcon() : void {
    if (this.menuOpen) {
      this.faIcon = this._faIconService.getIconDefinition('fas', 'times');
    } else {
      this.faIcon = this._faIconService.getIconDefinition('fas', 'bars');
    }
  }
}

