import { trigger, state, style, transition, animate } from "@angular/animations";
import { Component, EventEmitter, Input, Output, } from "@angular/core";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'ml-sidebar',
  templateUrl: './sidebar.component.html',
  animations: [
    trigger('openClosed', [
      state('open', style({
        width: '300px'
      })),
      state('closed', style({
        width: '0px'
      })),
      transition('open => closed', [ animate('0.3s')]),
      transition('closed => open', [ animate('0.3s')])
    ]),
    trigger('collapsedExpanded', [
      state('collapsed', style({
        rotate: '0deg',
        
      })),
      state('expanded', style({
        rotate: '180deg'
      })),
      transition('collapsed <=> expanded', [ animate('0.1s')])
    ])
  ]
})
export class SidebarComponent {
  @Input() public isOpen = false;
  @Output() public isOpenChange = new EventEmitter<boolean>();

  public faAngleRight = faAngleRight;

  public toggle(): void {
    this.isOpen = !this.isOpen;
    this.isOpenChange.emit(this.isOpen);
  }
}