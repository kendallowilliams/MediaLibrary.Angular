import { applicationConfig, moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { SidebarComponent } from '../sidebar.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ButtonModule, ControlsModule } from '../../controls';
import { useArgs } from '@storybook/preview-api';
import { CommonModule } from '@angular/common';
import { SidebarModule } from '../sidebar.module';

const meta: Meta<SidebarComponent> = {
  title: 'Components/Sidebar',
  component: SidebarComponent,
  decorators: [
    moduleMetadata({
      imports: [ 
        CommonModule, 
        ButtonModule, 
        SidebarModule,
        ControlsModule
      ],
    }),
    applicationConfig({
      providers: [provideAnimations()]
    }),
  ]
};

export default meta;
type Story = StoryObj<SidebarComponent>;

export const Default: Story = {
  args: {
    isOpen: false,
    width: 300
  },
  render: (args) => {
    const [{ isOpen }, updateArgs] = useArgs();

    return {
      props: {
        ...args,
        isOpenChange: () => updateArgs({...args, isOpen: !isOpen })
      },
      template: `
        <div class="w-full flex bg-secondary relative">
          <ml-sidebar [isOpen]="isOpen" (isOpenChange)="isOpenChange()" [width]="width">
            <div class="w-full p-[10px] bg-light h-full">
              <div class="flex flex-col gap-[10px] flex-nowrap">
                <label mlLabel>Text Field</label>
                <input mlTextBox placeholder="Enter something..." />
              </div>
            </div>
          </ml-sidebar>
          <div class="h-[600px] w-full p-[30px] text-light">
            <h1 class="font-bold text-2xl">Sidebar Demo</h1>
            <p>Note: height will be determined by the nearest positioned ancestor's height.</p>
          </div>
        </div>
      `
    }
  }
};