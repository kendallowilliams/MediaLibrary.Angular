import { moduleMetadata, Meta, StoryObj } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { ComponentRendererDirective } from '../component-renderer.directive';
import { SampleComponent } from './sample-content.component';

const meta: Meta<ComponentRendererDirective> = {
  title: 'Components/Utilties/ComponentRenderer',
  component: ComponentRendererDirective,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, ComponentRendererDirective]
    })
  ],
  argTypes: {
  }
};

export default meta;
type Story = StoryObj<ComponentRendererDirective>;

export const Default: Story = {
  args: {
    inputs: {
      "inputOne": "Input One"
    },
    outputs: {
      outputOne: (msg: unknown) => alert(msg)
    },
    componentType: SampleComponent
  },
  render: (args) => ({
    props: {
      ...args,
      componentType: SampleComponent
    },
    template: `
      <div>
        <ng-container mlComponentRenderer [componentType]="componentType" [inputs]="inputs" [outputs]="outputs"
          #componentRenderer="componentRenderer"></ng-container>
      </div>
      <div><button type="button" (click)="componentRenderer.reload()">Reload</button></div>
    `
  })
};