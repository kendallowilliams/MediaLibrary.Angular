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
    isOpen: false
  },
  render: (args) => {
    const [{ isOpen }, updateArgs] = useArgs();

    return {
      props: {
        ...args,
        isOpenChange: () => updateArgs({...args, isOpen: !isOpen })
      },
      template: `
        <div class="w-full flex bg-secondary">
          <ml-sidebar [isOpen]="isOpen" (isOpenChange)="isOpenChange()">
            <div class="w-full p-[10px] bg-light h-full">
              <div class="flex flex-col gap-[10px] flex-nowrap">
                <label mlLabel>Text Field</label>
                <input mlTextBox placeholder="Enter something..." />
              </div>
            </div>
          </ml-sidebar>
          <div class="flex h-[600px] w-full p-[30px]">
            <h1>Sidebar Demo</h1>
          </div>
        </div>
      `
    }
  }
};