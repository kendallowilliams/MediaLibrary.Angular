import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { SelectValueComparer } from '@media-library/ml-ui';
import { SelectOption } from '@media-library/ml-ui';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-settings',
  templateUrl: './app-settings.component.html',
  encapsulation: ViewEncapsulation.None
})
export class AppSettingsComponent {
  protected selectedOption = 'A';
  protected form: FormGroup;
  protected indices$ = new Subject<number[]>();
  protected valueComparerFn: SelectValueComparer<string> = (obj1: string, obj2: string) => obj1 === obj2;

  constructor(private _fb: FormBuilder) {
    this.form = this._fb.group({
      option: new FormControl(['A'])
    });
    
    const arr: number[] = [];

    window.setInterval(() => {
      if (arr.length < 10) arr.push(arr.length);
      this.indices$.next(arr);
    }, 2000);
  }

  public submit() : void {
    console.log(this.form.controls['option'].value);
  }

  public handleChange(evt: SelectOption<string> | null) : void {
    console.log(evt?.value);
  }
}
