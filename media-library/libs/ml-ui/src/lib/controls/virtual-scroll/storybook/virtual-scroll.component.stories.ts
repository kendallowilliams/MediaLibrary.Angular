import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { VirtualScrollComponent } from '../virtual-scroll.component';
import { VirtualScrollItemComponent } from '../virtual-scroll-item.component/virtual-scroll-item.component';

const meta: Meta<VirtualScrollComponent> = {
  title: 'Components/VirtualScroll',
  component: VirtualScrollComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, VirtualScrollComponent, VirtualScrollItemComponent],
    })
  ]
};

export default meta;
type Story = StoryObj<VirtualScrollComponent>;

export const Default: Story = {
  args: {
  },
  render: (args) => ({
    props: {
      ...args,
      items: [0,1,2,3,4,5,6,7,8,9]
    },
    template: `
      <div class="h-[200px]">
        <ml-virtual-scroll>
          <ml-virtual-scroll-item *ngFor="let index of items">Item {{index}}</ml-virtual-scroll-item>
        </ml-virtual-scroll>
      </div>
    `
  })
};