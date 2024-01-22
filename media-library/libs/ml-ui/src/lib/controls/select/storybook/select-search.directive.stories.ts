import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SelectModule } from '../select.module';
import { SelectSearchDirective } from '../directives/select-search.directive';

const meta: Meta<SelectSearchDirective> = {
  title: 'Components/Select/Search',
  component: SelectSearchDirective,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, SelectModule, FormsModule],
    })
  ]
};

export default meta;
type Story = StoryObj<SelectSearchDirective>;

export const Default: Story = {
  args: {
    partial: true,
    caseInsensitive: true,
    searchPlaceholder: 'Select an option...'
  },
  render: (args: SelectSearchDirective) => ({
    props: {
      ...args,
      options: [1,2,3,4,5,6,7,8,9]
        .map(item => ({
          text: `Option ${item}`,
          value: item
        })),
      placeholder: 'Select an option',
      defaultValue: [1,9]
    },
    template: `
      <div class="flex flex-col gap-[20px]">
        <ml-select mlSelectSearch [options]="options" [placeholder]="placeholder"
          [(ngModel)]="defaultValue" [searchPlaceholder]="searchPlaceholder" [partial]="partial"
          [caseInsensitive]="caseInsensitive"></ml-select>
        <ml-select mlSelectMultiSelect mlSelectSearch [options]="options" [placeholder]="placeholder"
          [(ngModel)]="defaultValue" [searchPlaceholder]="searchPlaceholder" [partial]="partial"
          [caseInsensitive]="caseInsensitive">></ml-select>
        <ml-select mlSelectMultiSelect mlSelectSearch [options]="options" [placeholder]="placeholder"
          [(ngModel)]="defaultValue" [searchPlaceholder]="searchPlaceholder" [partial]="partial"
          [caseInsensitive]="caseInsensitive">></ml-select>
      </div>
    `
  })
};