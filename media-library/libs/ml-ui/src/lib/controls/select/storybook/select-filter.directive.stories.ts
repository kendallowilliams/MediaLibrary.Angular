import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { MlUiModule } from '../../../ml-ui.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectFilterDirective } from '../directives/select-filter.directive';

const meta: Meta<SelectFilterDirective> = {
  title: 'Components/Select/Filter',
  component: SelectFilterDirective,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, MlUiModule, FormsModule, ReactiveFormsModule],
    })
  ]
};

export default meta;
type Story = StoryObj<SelectFilterDirective>;

export const Default: Story = {
  args: {
    query: 'Option 2'
  },
  render: (args: SelectFilterDirective) => ({
    props: {
      options: [1,2,3,4,5,6,7,8,9]
        .map(item => ({
          text: `Option ${item}`,
          value: item,
          selected: false
        })),
      placeholder: 'Select an option',
      defaultValue: 1,
      query: args.query
    },
    template: `
      <div>
        <ml-select mlSelectFilter [query]="query" [options]="options" [placeholder]="placeholder"
          [(ngModel)]="defaultValue"></ml-select>
      </div>
    `
  })
};