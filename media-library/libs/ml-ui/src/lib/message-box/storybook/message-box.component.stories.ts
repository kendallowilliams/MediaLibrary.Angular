import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { MESSAGE_BOX_TYPES, MessageBoxComponent } from '../message-box.component';
import { MessageBoxModule } from '../message-box.module';
import { ButtonModule } from '../../controls';
import { ModalModule } from '../../modal';

const meta: Meta<MessageBoxComponent> = {
  title: 'Components/Message Box',
  component: MessageBoxComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, MessageBoxModule, ButtonModule, ModalModule],
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
      ...args,
      isOpen: false
    },
    template: `
      <div class="flex justify-center">
        <button mlButton [variant]="'primary'" (click)="isOpen=true">Show&nbsp;<span class="capitalize">{{messageType}}</span></button>
        <ng-template mlModal [(isOpen)]="isOpen" [useAppRootVcr]="false">
          <ml-message-box [title]="title" [message]="message" [messageType]="messageType"></ml-message-box>
        </ng-template>
      </div>
    `
  })
};