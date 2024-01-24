import { Directive, HostBinding } from "@angular/core";

@Directive({
  selector: '[mlLabel]',
  standalone: true
})
export class LabelDirective {
  @HostBinding('class') private _class = 'font-bold text-dark dark:text-light';
}