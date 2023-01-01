import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TelevisionConfiguration, TelevisionService } from '@media-library/ml-data';

@Component({
  selector: 'app-television',
  templateUrl: './app-television.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppTelevisionComponent implements OnInit {
  private _configuration?: TelevisionConfiguration;

  constructor(private _televisionService: TelevisionService) {}
  
  public ngOnInit(): void {
    this._televisionService.getConfiguration()
      .subscribe(config => this._configuration = config);
  }
}
