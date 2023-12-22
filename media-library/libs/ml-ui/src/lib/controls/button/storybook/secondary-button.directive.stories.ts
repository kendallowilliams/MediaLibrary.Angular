import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { SecondaryButtonDirective } from '../directives/secondary-button.directive';
import { ButtonModule } from '../button.module';
import { BUTTON_VARIANTS } from '../directives/button.directive';

const variants = [...BUTTON_VARIANTS].filter(variant => variant !== 'light');

const meta: Meta<SecondaryButtonDirective> = {
  title: 'Components/Button/Secondary',
  component: SecondaryButtonDirective,
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
type Story = StoryObj<SecondaryButtonDirective>;

export const Default: Story = {
  args: {
    variant: 'primary'
  },
  render: (args) => ({
    props: {
      ...args
    },
    template: `
      <button mlSecondaryButton [variant]="variant">Click Me!</button>
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
        <button mlSecondaryButton *ngFor="let variant of variants" [variant]="variant" disabled><span class="capitalize">{{variant}}</span></button>
      </div>
    `
  })
};