import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { BUTTON_VARIANTS, ButtonDirective } from '../directives/button.directive';
import { ButtonModule } from '../button.module';

const meta: Meta<ButtonDirective> = {
  title: 'Components/Button',
  component: ButtonDirective,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, ButtonModule]
    })
  ],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: [...BUTTON_VARIANTS]
    }
  }
};

export default meta;
type Story = StoryObj<ButtonDirective>;

export const Default: Story = {
  args: {
    variant: 'primary'
  },
  render: (args) => ({
    props: {
      ...args
    },
    template: `
      <div>
        <button mlButton [variant]="variant">Click Me!</button>
      </div>
    `
  })
};