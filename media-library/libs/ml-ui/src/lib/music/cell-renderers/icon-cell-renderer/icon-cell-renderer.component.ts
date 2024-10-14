import { ICellRendererAngularComp } from '@ag-grid-community/angular';
import { ICellRendererParams } from '@ag-grid-community/core';
import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export type IconCellRendererParams = { icon: IconDefinition } & ICellRendererParams;

@Component({
  selector: 'ml-icon-renderer',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <fa-icon [icon]="faIcon" class="fa-2xl" />
  `
})
export class IconCellRendererComponent implements ICellRendererAngularComp {
  public faIcon!: IconDefinition;

  public agInit(params: IconCellRendererParams): void {
    this.faIcon = params.icon;
  }

  public refresh(/*params: IconCellRendererParams*/): boolean {
    return true;
  }
}
