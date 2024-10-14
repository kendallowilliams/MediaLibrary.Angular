import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SelectModule } from '../select.module';
import { SelectSearchDirective } from '../directives/select-search.directive';
import { groups, optionGroups, options } from './select.data';

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
  render: (args) => ({
    props: {
      ...args,
      options: options,
      groups: groups,
      optionGroups: optionGroups,
      placeholder: 'Select items...',
      dropdownConfig: {
        maxOptionsHeight: '100px'
      }
    },
    template: `
      <div class="flex flex-col gap-[20px]">
        <ml-select mlSelectSearch [options]="options" [placeholder]="placeholder"
          [searchPlaceholder]="searchPlaceholder" [partial]="partial"
          [caseInsensitive]="caseInsensitive" [dropdownConfig]="dropdownConfig"></ml-select>
        <ml-select mlSelectMultiSelect mlSelectSearch [options]="groups" [placeholder]="placeholder"
          [searchPlaceholder]="searchPlaceholder" [partial]="partial"
          [caseInsensitive]="caseInsensitive" [dropdownConfig]="dropdownConfig"></ml-select>
        <ml-select mlSelectMultiSelect mlSelectSearch [groups]="optionGroups" [placeholder]="placeholder"
          [searchPlaceholder]="searchPlaceholder" [partial]="partial"
          [caseInsensitive]="caseInsensitive" [dropdownConfig]="dropdownConfig"></ml-select>
      </div>
    `
  })
};