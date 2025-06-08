import { trigger, state, style, transition, animate } from "@angular/animations";
import { Component, EventEmitter, HostBinding, Input, OnInit, Output, } from "@angular/core";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

@Component({
    selector: 'ml-sidebar',
    templateUrl: './sidebar.component.html',
    animations: [
        trigger('openClosed', [
            state('open', style({
                width: 'var(--ml-sidebar-width)'
            })),
            state('closed', style({
                width: '0px'
            })),
            transition('open => closed', [animate('0.3s')]),
            transition('closed => open', [animate('0.3s')])
        ]),
        trigger('collapsedExpanded', [
            state('collapsed', style({
                rotate: '0deg',
            })),
            state('expanded', style({
                rotate: '180deg'
            })),
            transition('collapsed <=> expanded', [animate('0.1s')])
        ])
    ],
    standalone: false
})
export class SidebarComponent implements OnInit {
  /** Width of sidebar (default: 300) */
  @Input() public width?: number;
  @Input() public isOpen = false;
  @Output() public isOpenChange = new EventEmitter<boolean>();

  @HostBinding('style.position') private _position = 'absolute';
  @HostBinding('style.height') private _height = '100%';
  @HostBinding('style.--ml-sidebar-width') private _width?: string;

  public faAngleRight = faAngleRight;

  public ngOnInit(): void {
    this._width = `${this.width || 300}px`;
  }

  public toggle(): void {
    this.isOpen = !this.isOpen;
    this.isOpenChange.emit(this.isOpen);
  }

  public close(evt: FocusEvent): void {
    if (!evt.relatedTarget && this.isOpen) {
      this.isOpen = false;
      this.isOpenChange.emit(false);
    }
  }
}