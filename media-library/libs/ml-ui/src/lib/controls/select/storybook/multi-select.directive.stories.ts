import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SelectMultiSelectDirective } from '../directives/select-multiselect.directive';
import { SelectModule } from '../select.module';
import { options } from './select.data';

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
      options: options,
      placeholder: 'Select an option',
      defaultValue: [1,9]
    },
    template: `
      <div>
        <ml-select mlSelectMultiSelect [options]="options" [placeholder]="placeholder"
          [(ngModel)]="defaultValue" class="[--dropdown-options-height:100px]"></ml-select>
      </div>
    `
  })
};