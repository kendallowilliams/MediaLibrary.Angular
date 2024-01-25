import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  Input,
  OnInit,
  Renderer2,
  RendererStyleFlags2,
  ViewEncapsulation,
} from '@angular/core';
import { SelectComponent } from '../select.component';
import { SelectDropdownConfig, SelectOption, SelectOptionGroup } from '../types/select.types';

@Component({
  selector: 'ml-select-dropdown-content',
  templateUrl: './select-dropdown-content.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.Default,
})
export class SelectDropdownContentComponent implements OnInit {
  @Input() public config: SelectDropdownConfig | null = null;
  
  public groups: SelectOptionGroup[] | null = null;
  public options: SelectOption[] | null = null;

  constructor(private _select: SelectComponent, private _renderer: Renderer2, private _host: ElementRef<HTMLElement>) {
    this.groups = this._select.internalGroups;
    this.options = this._select.internalOptions;
  }
  
  public ngOnInit(): void {
    if (this.config?.maxOptionsHeight) {
      this._renderer.setStyle(this._host.nativeElement, '--dropdown-options-height', this.config.maxOptionsHeight, RendererStyleFlags2.DashCase);
    }
  }
}
