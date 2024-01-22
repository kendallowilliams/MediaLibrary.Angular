import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SelectModule } from '../select.module';
import { SelectSearchDirective } from '../directives/select-search.directive';
import { categories, groups, options } from './select.data';

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
      options: options,
      groups: groups,
      categories: categories,
      placeholder: 'Select items...'
    },
    template: `
      <div class="flex flex-col gap-[20px]">
        <ml-select mlSelectSearch [options]="options" [placeholder]="placeholder"
          [searchPlaceholder]="searchPlaceholder" [partial]="partial"
          [caseInsensitive]="caseInsensitive" class="[--dropdown-options-height:100px]"></ml-select>
        <ml-select mlSelectMultiSelect mlSelectSearch [options]="groups" [placeholder]="placeholder"
          [searchPlaceholder]="searchPlaceholder" [partial]="partial"
          [caseInsensitive]="caseInsensitive" class="[--dropdown-options-height:100px]"></ml-select>
        <ml-select mlSelectMultiSelect mlSelectSearch [options]="categories" [placeholder]="placeholder"
          [searchPlaceholder]="searchPlaceholder" [partial]="partial"
          [caseInsensitive]="caseInsensitive" class="[--dropdown-options-height:100px]"></ml-select>
      </div>
    `
  })
};