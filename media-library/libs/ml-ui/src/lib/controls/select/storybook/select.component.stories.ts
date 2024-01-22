import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { SelectComponent } from '../select.component';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ControlsModule } from '../../controls.module';
import { options } from './select.data';

const meta: Meta<SelectComponent> = {
  title: 'Components/Select',
  component: SelectComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, FormsModule, ReactiveFormsModule, ControlsModule],
    })
  ]
};

export default meta;
type Story = StoryObj<SelectComponent>;

export const Default: Story = {
  args: {
    options: options,
    placeholder: 'Select an option'
  },
  render: (args) => ({
    props: {
      ...args,
      selectedValue: 5
    },
    template: `
      <ml-select [options]="options" [placeholder]="placeholder" [(ngModel)]="selectedValue"
        class="[--dropdown-options-height:100px]"></ml-select>
    `
  })
};

export const Required: Story = {
  args: {
    options: options,
    placeholder: 'Select an option'
  },
  render: (args) => ({
    props: {
      ...args,
      formGroup: new FormGroup({ select: new FormControl(null, [Validators.required]) })
    },
    template: `
      <div [formGroup]="formGroup">
        <ml-select [options]="options" [placeholder]="placeholder" formControlName="select"
          class="[--dropdown-options-height:100px]"></ml-select>
      </div>
    `
  })
};