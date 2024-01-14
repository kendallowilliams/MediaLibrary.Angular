import { Meta, StoryObj, moduleMetadata } from "@storybook/angular";
import { TooltipDirective } from "../directives/tooltip.directive";
import { TooltipModule } from "../tooltip.module";
import { CommonModule } from "@angular/common";
import { ButtonModule } from "../../controls";

const meta: Meta<TooltipDirective> = {
  title: 'Components/Tooltip',
  component: TooltipDirective,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, TooltipModule, ButtonModule],
    })
  ],
  argTypes: {
  }
};

export default meta;
type Story = StoryObj<TooltipDirective>;

export const Basic: Story = {
  args: {

  },
  render: (args: TooltipDirective) => ({
    props: {
      ...args
    },
    template: `
      <button mlButton mlTooltip [ttContent]="content" [ttTrigger]="'hover'">Click Me!</button>
      <ng-template #content>
        Click the button!
      </ng-template>
    `
  })
};