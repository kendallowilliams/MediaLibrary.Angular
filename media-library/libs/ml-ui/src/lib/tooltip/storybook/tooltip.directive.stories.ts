import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { ButtonModule } from '../../controls';
import { TooltipDirective } from '../tooltip.directive';
import { TooltipModule } from '../tooltip.module';

const meta: Meta<TooltipDirective> = {
  title: 'Components/Tooltip',
  component: TooltipDirective,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, ButtonModule, TooltipModule],
    })
  ]
};

export default meta;
type Story = StoryObj<TooltipDirective>;

export const Default: Story = {
  args: {
  },
  render: (args) => ({
    props: {
      ...args,
      appendTo: 'body',
      placement: 'top-start'
    },
    template: `
      <button mlButton [mlTooltip]="'Hello, Tooltip!'" [appendTo]="appendTo" [placement]="placement"
        (click)="hidden=!hidden">Click Me!</button>
    `
  })
};