import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { UpdateIfLargerThanParentDirective } from './update-if-larger-than-parent.directive';
import { MlUtilityModule } from '../../ml-utility.module';

export default {
  component: UpdateIfLargerThanParentDirective,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, MlUtilityModule],
    })
  ],
  argTypes: {

  }
} as Meta<UpdateIfLargerThanParentDirective>;

const basicTemplate: Story<UpdateIfLargerThanParentDirective> = (args: UpdateIfLargerThanParentDirective) => ({
  props: { ...args },
  template: `
    <div style="display: flex; height: 400px">
      <div style="flex: 1 1 auto; overflow: hidden">
        <div style="height: 1080px; width: 1920px"
          mlUpdateIfLargerThanParent [observeParentResize]="${args.observeParentResize}"
          [updateTarget]="'${args.updateTarget}'" [targetName]="'${args.targetName}'"
          [targetValue]="'${args.targetValue}'" [ignoreHeight]="${args.ignoreHeight}"
          [ignoreWidth]="${args.ignoreWidth}">TEST</div>
      </div>
    </div>
  `
});

export const basic = basicTemplate.bind({});
basic.args = {
  updateTarget: 'class',
  targetName: 'hidden',
  targetValue: 'none',
  observeParentResize: true,
  ignoreHeight: true
};
