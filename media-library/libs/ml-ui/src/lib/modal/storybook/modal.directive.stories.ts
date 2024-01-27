import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalDirective } from '../directives/modal.directive';
import { ModalModule } from '../modal.module';
import { ButtonModule } from '../../controls/button/button.module';
import { AppRootVcrDirective } from '@media-library/ml-utility';
import { MessageBoxModule } from '../../message-box';
import { useArgs } from '@storybook/preview-api';
import { ModalConfig } from '../models/ModalConfig.model';
import { ControlsModule } from '../../controls';

const meta: Meta<ModalDirective> = {
  title: 'Components/Modal',
  component: ModalDirective,
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule, 
        FormsModule,
        ReactiveFormsModule,
        ModalModule, 
        ButtonModule, 
        AppRootVcrDirective, 
        MessageBoxModule,
        ControlsModule
      ],
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
        options: [{
          text: 'Visible',
          value: 'visible' as ModalConfig['backdrop']
        }, {
          text: 'Transparent',
          value: 'transparent' as ModalConfig['backdrop']
        }]
      },
      template: `
      <div class="flex justify-center">
        <button mlButton (click)="isOpenChange()">Show</button>
        <ng-template mlModal [(isOpen)]="isOpen" (isOpenChange)="isOpenChange()" [useAppRootVcr]="useAppRootVcr" 
          [config]="config">
          <ml-modal-content class="w-[300px]">
            <ml-modal-header>
              <ml-modal-title>Modal Config</ml-modal-title>
            </ml-modal-header>
            <ml-modal-body class="flex flex-col gap-[20px]">
              <div class="flex flex-col gap-[10px]">
                <label mlLabel>Static</label>
                <ml-switch [offLabel]="'Off'" [onLabel]="'On'" [(ngModel)]="config.static"></ml-switch>
              </div>
              <div class="flex flex-col gap-[10px]">
                <label mlLabel>Backdrop</label>
                <ml-select [options]="options" [(ngModel)]="config.backdrop"></ml-select>
              </div>
              <div class="flex flex-col gap-[10px]">
                <label mlLabel>Modeless</label>
                <ml-switch [offLabel]="'Off'" [onLabel]="'On'" [(ngModel)]="config.modeless"></ml-switch>
              </div>
            </ml-modal-body>
          </ml-modal-content>
        </ng-template>
      </div>
      
      <ng-container mlAppRootVcr></ng-container>
      `
    }
  }
};