import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { TabGroupComponent } from '../tab-group/tab-group.component';
import { TabModule } from '../tab.module';

const meta: Meta<TabGroupComponent> = {
  title: 'Components/TabGroup',
  component: TabGroupComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, TabModule]
    })
  ],
  argTypes: {
    alignment: {
      options: ['left', 'center', 'right'],
      control: {
        type: 'select'
      },
      table: {
        defaultValue: {
          summary: 'left'
        }
      }
    }
  }
};

export default meta;
type Story = StoryObj<TabGroupComponent>;

export const Default: Story = {
  args: {
    alignment: 'left'
  },
  render: (args) => ({
    props: {
      ...args
    },
    template: `
      <ml-tab-group [alignment]="alignment">
        <div class="p-[20px] border-[1px] border-solid">
          <ml-tab [headerText]="'Sunday'" [isSelected]="true">Sunday Content</ml-tab>
          <ml-tab [headerText]="'Monday'">Monday Content</ml-tab>
          <ml-tab [headerText]="'Tuesday'">Tuesday Content</ml-tab>
          <ml-tab [headerText]="'Wednesday'">Wednesday Content</ml-tab>
          <ml-tab [headerText]="'Thursday'">Thursday Content</ml-tab>
          <ml-tab [headerText]="'Friday'">Friday Content</ml-tab>
          <ml-tab [headerText]="'Saturday'">Saturday Content</ml-tab>
        </div>
      </ml-tab-group>
    `
  })
};