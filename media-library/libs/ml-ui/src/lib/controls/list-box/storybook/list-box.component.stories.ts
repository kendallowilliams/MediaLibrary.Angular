import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { ListBoxComponent } from '../list-box.component';
import { FormsModule } from '@angular/forms';
import { ListBoxModule } from '../list-box.module';

const meta: Meta<ListBoxComponent<number>> = {
  title: 'Components/List Box',
  component: ListBoxComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, ListBoxModule, FormsModule]
    })
  ],
  argTypes: {
  }
};

export default meta;
type Story = StoryObj<ListBoxComponent<number>>;

const listItems = [{
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
}];

export const Default: Story = {
  args: {
    readonly: false
  },
  render: (args) => ({
    props: {
      ...args,
      items: [...listItems.map(item => ({...item}))],
      selectedValues: [1, 6],
      countryItem: {
        name: 'Countries',
        value: 6
      }
    },
    template: `
      <div>
        <ml-list-box [readonly]="readonly" [items]="items" [(ngModel)]="selectedValues">
          <ml-list-box-item [item]="countryItem"></ml-list-box-item>
        </ml-list-box>
      </div>
    `
  })
};

export const Disabled: Story = {
  args: {
    readonly: false
  },
  render: (args) => ({
    props: {
      ...args,
      items: [...listItems.map(item => ({...item}))],
      selectedValues: [],
      countryItem: {
        name: 'Countries',
        value: 6
      }
    },
    template: `
      <div>
        <ml-list-box [readonly]="readonly" [items]="items" [(ngModel)]="selectedValues" disabled>
          <ml-list-box-item [item]="countryItem"></ml-list-box-item>
        </ml-list-box>
      </div>
    `
  })
};