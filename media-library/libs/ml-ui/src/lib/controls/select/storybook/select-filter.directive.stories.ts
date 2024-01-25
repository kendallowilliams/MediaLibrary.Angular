import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SelectFilterDirective } from '../directives/select-filter.directive';
import { SelectModule } from '../select.module';
import { options } from './select.data';

const meta: Meta<SelectFilterDirective> = {
  title: 'Components/Select/Filter',
  component: SelectFilterDirective,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, SelectModule, FormsModule],
    })
  ]
};

export default meta;
type Story = StoryObj<SelectFilterDirective>;

export const Default: Story = {
  args: {
    query: '',
    caseInsensitive: true,
    partial: true
  },
  render: (args: SelectFilterDirective) => ({
    props: {
      options: options,
      placeholder: 'Select an option',
      defaultValue: 1,
      ...args
    },
    template: `
      <div>
        <ml-select mlSelectFilter [(query)]="query" [caseInsensitive]="caseInsensitive" [partial]="partial"
          [options]="options" [placeholder]="placeholder"
          [(ngModel)]="defaultValue"></ml-select>
      </div>
    `
  })
};