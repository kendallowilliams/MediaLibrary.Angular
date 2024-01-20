import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { PopoverDirective } from '../directives/popover.directive';
import { ButtonModule } from '../../controls';
import { PopoverModule } from '../popover.module';

const meta: Meta<PopoverDirective> = {
  title: 'Components/Popover',
  component: PopoverDirective,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, ButtonModule, PopoverModule],
    })
  ]
};

export default meta;
type Story = StoryObj<PopoverDirective>;

export const Default: Story = {
  args: {
    appendTo: 'body',
    placement: 'top',
    hidden: true
  },
  render: (args) => ({
    props: {
      ...args
    },
    template: `
      <button mlButton mlPopover [appendTo]="appendTo" [content]="content" [placement]="placement" [hidden]="hidden"
        (click)="hidden=!hidden">Click Me!</button>

      <ng-template #content>
        <div class="">Hello, world!</div>
      </ng-template>
    `
  })
};