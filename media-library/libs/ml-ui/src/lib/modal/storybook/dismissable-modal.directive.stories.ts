import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DismissableModalDirective } from '../directives/dismissable-modal.directive';
import { ModalModule } from '../modal.module';
import { ButtonModule } from '../../controls/button/button.module';
import { AppRootVcrDirective } from '@media-library/ml-utility';
import { MessageBoxModule } from '../../message-box';
import { useArgs } from '@storybook/preview-api';
import { MODAL_BACKDROPS } from '../models/ModalConfig.model';

const meta: Meta<DismissableModalDirective> = {
  title: 'Components/Modal/Dismissable',
  component: DismissableModalDirective,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, FormsModule, ModalModule, ButtonModule, AppRootVcrDirective, MessageBoxModule],
    })
  ],
  argTypes: {
    backdrop: {
      options: MODAL_BACKDROPS,
      control: { type: 'select' }
    }
  }
};

export default meta;
type Story = StoryObj<DismissableModalDirective>;

export const Default: Story = {
  args: {
    isOpen: false,
    backdrop: 'transparent',
    useAppRootVcr: true
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
        <ng-template mlDismissableModal [(isOpen)]="isOpen" (isOpenChange)="isOpenChange()" [useAppRootVcr]="useAppRootVcr" 
          [backdrop]="backdrop">
          <ml-message-box [title]="title" [message]="message" [messageType]="messageType"></ml-message-box>
        </ng-template>
      </div>
      <ng-container mlAppRootVcr></ng-container>
      `
    }
  }
};