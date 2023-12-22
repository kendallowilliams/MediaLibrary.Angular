import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { BUTTON_VARIANTS, ButtonDirective } from '../directives/button.directive';
import { ButtonModule } from '../button.module';

const variants = [...BUTTON_VARIANTS];

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
      options: variants
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

export const Disabled: Story = {
  render: (args) => ({
    props: {
      ...args,
      variants
    },
    template: `
      <div class="flex flex-wrap gap-[10px]">
        <button mlButton *ngFor="let variant of variants" [variant]="variant" disabled><span class="capitalize">{{variant}}</span></button>
      </div>
    `
  })
};