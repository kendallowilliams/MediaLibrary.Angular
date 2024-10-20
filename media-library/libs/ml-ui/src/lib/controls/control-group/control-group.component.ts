import { ChangeDetectionStrategy, Component, ViewEncapsulation } from "@angular/core";

@Component({
  selector: 'ml-control-group',
  template: `
      <div class="grid grid-flow-col auto-cols-auto h-control
        [&>*:not([mlButton]):not([mlSecondaryButton])]:border-[1px] 
        [&>*:not([mlButton]):not([mlSecondaryButton])]:rounded-[5px] 
        [&>*:not([mlButton]):not([mlSecondaryButton])]:border-solid 
        [&>*:not([mlButton]):not([mlSecondaryButton])]:border-dark
        [&>*:not(:last-child)]:!rounded-r-none 
        [&>*:not(:first-child)]:!rounded-l-none w-fit">
        <ng-content></ng-content>
      </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ControlGroupComponent {}