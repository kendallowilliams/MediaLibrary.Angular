import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalDirective } from '../directives/modal.directive';
import { ModalModule } from '../modal.module';
import { ButtonModule } from '../../controls/button/button.module';
import { AppRootVcrDirective } from '@media-library/ml-utility';
import { MessageBoxModule } from '../../message-box';
import { useArgs } from '@storybook/preview-api';
import { ModalConfig } from '../models/ModalConfig.model';

const meta: Meta<ModalDirective> = {
  title: 'Components/Modal',
  component: ModalDirective,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, FormsModule, ModalModule, ButtonModule, AppRootVcrDirective, MessageBoxModule],
    })
  ],
  argTypes: {
  }
};

export default meta;
type Story = StoryObj<ModalDirective>;

export const Default: Story = {
  args: {
    isOpen: false,
    config: new ModalConfig<unknown>(),
    useAppRootVcr: true,
  },
  render: (args) => {
    const [{ isOpen }, updateArgs] = useArgs();
    return {
      props: {
        ...args,
        isOpen,
        isOpenChange: () => updateArgs({ ...args, isOpen: !isOpen }),
        title: 'Hello, World!',
        message: 'Hello, world!',
        messageType: 'alert'
      },
      template: `
      <div class="flex justify-center">
        <button mlButton (click)="isOpenChange()">Show</button>
        <ng-template mlModal [(isOpen)]="isOpen" (isOpenChange)="isOpenChange()" [useAppRootVcr]="useAppRootVcr" 
          [config]="config">
          <ml-message-box [title]="title" [message]="message" [messageType]="messageType"></ml-message-box>
        </ng-template>
      </div>
      
      <ng-container mlAppRootVcr></ng-container>
      `
    }
  }
};