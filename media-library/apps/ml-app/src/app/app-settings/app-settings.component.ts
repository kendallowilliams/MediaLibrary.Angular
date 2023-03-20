import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { SelectValueComparer } from '@media-library/ml-ui';

@Component({
  selector: 'app-settings',
  templateUrl: './app-settings.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppSettingsComponent {
  protected selectedOption = 'A';
  protected form: FormGroup;
  protected valueComparer: SelectValueComparer = (obj1: any, obj2: any) => (obj1?.test && obj2?.test && obj1.test === obj2.test) || obj1 === obj2;

  constructor(private _fb: FormBuilder) {
    this.form = this._fb.group({
      option: new FormControl({test: 1})
    });
  }

  public submit() : void {
    console.log(this.form.controls['option'].value);
  }

  public handleChange(evt: Event) : void {
    console.log(evt);
  }
}
