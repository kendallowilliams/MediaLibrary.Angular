import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  RendererStyleFlags2,
  ViewEncapsulation,
} from '@angular/core';
import { SelectDropdownConfig, SelectOption, SelectOptionGroup } from '../types/select.types';

@Component({
  selector: 'ml-select-dropdown-content',
  templateUrl: './select-dropdown-content.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.Default,
})
export class SelectDropdownContentComponent implements OnInit {
  @Input() public config: SelectDropdownConfig | null = null;
  @Input() public groups: SelectOptionGroup[] | null = null;
  @Input() public options: SelectOption[] | null = null;

  constructor(private _renderer: Renderer2, private _host: ElementRef<HTMLElement>) {}
  
  public ngOnInit(): void {
    if (this.config?.maxOptionsHeight) {
      this._renderer.setStyle(this._host.nativeElement, '--dropdown-options-height', this.config.maxOptionsHeight, RendererStyleFlags2.DashCase);
    }
  }
}
