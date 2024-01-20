import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { SelectComponent } from '../select.component';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ControlsModule } from '../../controls.module';

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
    options: [1,2,3,4,5,6,7,8,9]
      .map(item => ({
        text: `Option ${item}`,
        value: item
    })),
    placeholder: 'Select an option'
  },
  render: (args) => ({
    props: {
      ...args,
      selectedValue: 5
    },
    template: `
      <ml-select [options]="options" [placeholder]="placeholder" [(ngModel)]="selectedValue"></ml-select>
    `
  })
};

export const Required: Story = {
  args: {
    options: [1,2,3,4,5,6,7,8,9]
      .map(item => ({
        text: `Option ${item}`,
        value: item
    })),
    placeholder: 'Select an option'
  },
  render: (args) => ({
    props: {
      ...args,
      formGroup: new FormGroup({ select: new FormControl(null, [Validators.required]) })
    },
    template: `
      <div [formGroup]="formGroup">
        <ml-select [options]="options" [placeholder]="placeholder" formControlName="select"></ml-select>
      </div>
    `
  })
};