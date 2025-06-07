import { 
  AfterContentInit, AfterViewInit, Component, ContentChildren, 
  DestroyRef, ElementRef, Input, OnInit, QueryList, TemplateRef, 
  ViewChild 
} from '@angular/core';
import { VirtualScrollItemComponent } from './virtual-scroll-item.component/virtual-scroll-item.component';
import { CommonModule } from '@angular/common';
import { ListBoxModule } from "../list-box/list-box.module";
import { debounceTime, fromEvent } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'ml-virtual-scroll',
  standalone: true,
  imports: [CommonModule, ListBoxModule],
  templateUrl: './virtual-scroll.component.html'
})
export class VirtualScrollComponent implements OnInit, AfterContentInit, AfterViewInit {
  @Input() public rowHeight = 25;
  @Input() public visibleItemCount = 4;

  @ViewChild('container', { read: ElementRef }) private container!: ElementRef;
  @ContentChildren(VirtualScrollItemComponent) private children!: QueryList<VirtualScrollItemComponent>;

  public visibleTemplates: TemplateRef<unknown>[] | undefined;
  public containerHeight?: number;
  public visibleContainerHeight?: number;
  public offsetY?: number;
  private animationId?: number;

  constructor(private destroyRef: DestroyRef) {}

  public ngOnInit(): void {
    this.visibleContainerHeight = this.rowHeight * this.visibleItemCount;
  }

  public ngAfterContentInit(): void {
    this.containerHeight = this.rowHeight * this.children.length;
    this.redraw(0);
  }

  public ngAfterViewInit(): void {
    fromEvent<Event>(this.container.nativeElement, 'scroll')
      .pipe(takeUntilDestroyed(this.destroyRef), debounceTime(17))
      .subscribe(evt => {
        const element = evt.target as HTMLElement;
        this.redraw(element?.scrollTop);
      });
  }

  private redraw(scrollTop: number): void {
    this.animationId && cancelAnimationFrame(this.animationId);
    this.animationId = requestAnimationFrame(() => {
      const startNode = Math.floor(scrollTop / this.rowHeight);
      this.offsetY = startNode * this.rowHeight;
      this.visibleTemplates = this.children
        ?.filter((_, index) => index >= startNode && index <= (startNode + this.visibleItemCount))
        .map(c => c.vsTemplate);
    });
  }
}
