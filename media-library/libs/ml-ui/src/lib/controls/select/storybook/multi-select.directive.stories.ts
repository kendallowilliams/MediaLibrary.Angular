import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SelectMultiSelectDirective } from '../directives/select-multiselect.directive';
import { SelectModule } from '../select.module';

const meta: Meta<SelectMultiSelectDirective> = {
  title: 'Components/Select/MultiSelect',
  component: SelectMultiSelectDirective,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, SelectModule, FormsModule],
    })
  ]
};

export default meta;
type Story = StoryObj<SelectMultiSelectDirective>;

export const Default: Story = {
  render: () => ({
    props: {
      options: [1,2,3,4,5,6,7,8,9]
        .map(item => ({
          text: `Option ${item}`,
          value: item,
          selected: false
        })),
      placeholder: 'Select an option',
      defaultValue: [1,9]
    },
    template: `
      <div>
        <ml-select mlSelectMultiSelect [options]="options" [placeholder]="placeholder"
          [(ngModel)]="defaultValue"></ml-select>
      </div>
    `
  })
};