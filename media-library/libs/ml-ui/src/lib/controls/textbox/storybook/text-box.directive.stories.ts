import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { TextBoxDirective } from '../directives/text-box.directive';
import { ControlsModule } from '../../controls.module';

const meta: Meta<TextBoxDirective> = {
  title: 'Components/TextBox',
  component: TextBoxDirective,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, ControlsModule]
    })
  ],
  argTypes: {
  }
};

export default meta;
type Story = StoryObj<TextBoxDirective>;

export const Default: Story = {
  args: {
  },
  render: (args) => ({
    props: {
      ...args
    },
    template: `
      <div>
        <input mlTextBox />
      </div>
    `
  })
};

export const Disabled: Story = {
  render: (args) => ({
    props: {
      ...args
    },
    template: `
    <div>
      <input mlTextBox disabled />
    </div>
    `
  })
};