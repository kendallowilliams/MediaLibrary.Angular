import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { MESSAGE_BOX_TYPES, MessageBoxComponent } from '../message-box.component';
import { MessageBoxModule } from '../message-box.module';

const meta: Meta<MessageBoxComponent> = {
  title: 'Components/Message Box',
  component: MessageBoxComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, MessageBoxModule],
    })
  ],
  argTypes: {
    messageType: {
      options: MESSAGE_BOX_TYPES,
      control: { type: 'select' }
    }
  }
};

export default meta;
type Story = StoryObj<MessageBoxComponent>;

export const Default: Story = {
  args: {
    title: 'Hello, World!',
    message: 'Hello, world!',
    messageType: 'alert'
  },
  render: (args: MessageBoxComponent) => ({
    props: {
      ...args
    },
    template: `
      <div class="flex justify-center">
        <ml-message-box [title]="title" [message]="message" [messageType]="messageType"></ml-message-box>
      </div>
    `
  })
};