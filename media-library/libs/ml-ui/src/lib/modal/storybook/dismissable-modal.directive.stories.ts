import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DismissableModalDirective } from '../directives/dismissable-modal.directive';
import { ModalModule } from '../modal.module';
import { ButtonModule } from '../../controls/button/button.module';

const meta: Meta<DismissableModalDirective> = {
  title: 'Components/Modal/Dismissable Modal',
  component: DismissableModalDirective,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, FormsModule, ModalModule, ButtonModule],
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
  render: (args) => ({
    props: {
      ...args
    },
    template: `
      <button type="button" mlButton (click)="isOpen=!isOpen">Toggle</button>
      <ng-template mlDismissableModal [(isOpen)]="isOpen" [backdrop]="backdrop">
        <div class="flex h-[250px] w-[250px] items-center justify-center">
          <div class="h-full w-full bg-dark dark:bg-light dark:text-dark text-light">Hello, world!</div>
        </div>
      </ng-template>
    `
  })
};