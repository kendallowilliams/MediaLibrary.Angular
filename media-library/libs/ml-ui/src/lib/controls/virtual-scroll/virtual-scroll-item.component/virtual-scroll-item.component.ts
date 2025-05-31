import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'ml-virtual-scroll-item',
  standalone: true,
  imports: [CommonModule],
  template: '<ng-template #vsTemplate><ng-content></ng-content></ng-template>',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VirtualScrollItemComponent {
  @ViewChild('vsTemplate', { read: TemplateRef }) public vsTemplate!: TemplateRef<unknown>;
}