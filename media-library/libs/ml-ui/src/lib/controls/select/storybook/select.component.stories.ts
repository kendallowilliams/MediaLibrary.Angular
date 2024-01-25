import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { SelectComponent } from '../select.component';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ControlsModule } from '../../controls.module';
import { optionGroups, options } from './select.data';

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
    placeholder: 'Select an option'
  },
  render: (args) => ({
    props: {
      ...args,
      options: options,
      groups: optionGroups,
      selectedValue: 5,
      selectedGroupValue: 5
    },
    template: `
      <div class="flex gap-[30px]">
        <div class="flex flex-col gap-[10px] basis-1/2">
          <label mlLabel>Options</label>
          <ml-select [options]="options" [placeholder]="placeholder" [(ngModel)]="selectedValue"></ml-select>
        </div>
        <div class="flex flex-col gap-[10px] basis-1/2">
          <label mlLabel>Categories</label>
          <ml-select [groups]="groups" [placeholder]="placeholder" [(ngModel)]="selectedGroupValue"></ml-select>
        </div>
      </div>
    `
  })
};

export const Required: Story = {
  args: {
    placeholder: 'Select an option'
  },
  render: (args) => ({
    props: {
      ...args,
      options: options,
      groups: optionGroups,
      formGroup: new FormGroup({ 
        options: new FormControl(null, [Validators.required]),
        groups: new FormControl(null, [Validators.required])
      })
    },
    template: `
      <div class="flex gap-[30px]" [formGroup]="formGroup">
        <div class="flex flex-col gap-[10px] basis-1/2">
          <label mlLabel>Options</label>
          <ml-select [options]="options" [placeholder]="placeholder" formControlName="options"></ml-select>
        </div>
        <div class="flex flex-col gap-[10px] basis-1/2">
          <label mlLabel>Categories</label>
          <ml-select [groups]="groups" [placeholder]="placeholder" formControlName="groups"></ml-select>
        </div>
      </div>
    `
  })
};