import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { SelectComponent } from '../select.component';
import { CommonModule } from '@angular/common';
import { MlUiModule } from '../../../ml-ui.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const meta: Meta<SelectComponent<string>> = {
  component: SelectComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, MlUiModule, FormsModule, ReactiveFormsModule],
    })
  ]
};

export default meta;
type Story = StoryObj<SelectComponent<string>>;

export const Default: Story = {
  render: () => ({
    props: {
      options: [1,2,3,4,5,6,7,8,9].map(item => ({
        text: `Option ${item}`,
        value: item
      })),
      defaultValue: 1
    },
    template: `
      <div class="w-full">
        <ml-select [options]="options" [placeholder]="'Select an option'" [(ngModel)]="defaultValue"></ml-select>
      </div>
    `
  }),
};