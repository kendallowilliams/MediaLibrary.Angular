import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { ListBoxComponent } from '../list-box.component';
import { ControlsModule } from '../../controls.module';
import { FormsModule } from '@angular/forms';

const meta: Meta<ListBoxComponent> = {
  title: 'Components/List Box',
  component: ListBoxComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, ControlsModule, FormsModule]
    })
  ],
  argTypes: {
  }
};

export default meta;
type Story = StoryObj<ListBoxComponent>;

export const Default: Story = {
  args: {
    readonly: false
  },
  render: (args) => ({
    props: {
      ...args,
      items: ['Cars', 'Pets', 'Games', 'Movies', 'Categories'],
    },
    template: `
      <div>
        <ml-list-box [readonly]="readonly" [(ngModel)]="items" disabled></ml-list-box>
      </div>
    `
  })
};