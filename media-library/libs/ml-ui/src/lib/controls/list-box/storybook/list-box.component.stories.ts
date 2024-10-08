import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { ListBoxComponent } from '../list-box.component';
import { ControlsModule } from '../../controls.module';
import { FormsModule } from '@angular/forms';

const meta: Meta<ListBoxComponent<number>> = {
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
type Story = StoryObj<ListBoxComponent<number>>;

export const Default: Story = {
  args: {
    readonly: false
  },
  render: (args) => ({
    props: {
      ...args,
      items: [{
        name: 'Cars',
        value: 1
      }, {
        name: 'Pets',
        value: 2
      }, {
        name: 'Games',
        value: 3
      }, {
        name: 'Movies', 
        value: 4 
      }, {
        name: 'Categories',
        value: 5
      }],
      selectedValues: []
    },
    template: `
      <div>
        <ml-list-box [readonly]="readonly" [items]="items" [(ngModel)]="selectedValues" disabled></ml-list-box>
      </div>
    `
  })
};