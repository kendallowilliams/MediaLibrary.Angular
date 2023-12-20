import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DismissableModalDirective } from '../directives/dismissable-modal.directive';
import { ModalModule } from '../modal.module';
import { ButtonModule } from '../../controls/button/button.module';
import { AppRootVcrDirective } from '@media-library/ml-utility';
import { MessageBoxModule } from '../../message-box';
import { useArgs } from '@storybook/preview-api';

const meta: Meta<DismissableModalDirective> = {
  title: 'Components/Modal/Dismissable Modal',
  component: DismissableModalDirective,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, FormsModule, ModalModule, ButtonModule, AppRootVcrDirective, MessageBoxModule],
    })
  ]
};

export default meta;
type Story = StoryObj<DismissableModalDirective>;

export const Default: Story = {
  args: {
    isOpen: false,
    backdrop: 'transparent'
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
        <ng-template mlDismissableModal [(isOpen)]="isOpen" (isOpenChange)="isOpenChange()" [useAppRootVcr]="false">
          <ml-message-box [title]="title" [message]="message" [messageType]="messageType"></ml-message-box>
        </ng-template>
      </div>
      <ng-container mlAppRootVcr></ng-container>
      `
    }
  }
};