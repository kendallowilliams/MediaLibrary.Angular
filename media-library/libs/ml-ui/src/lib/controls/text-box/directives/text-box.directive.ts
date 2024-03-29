import { Directive, HostBinding } from "@angular/core";

@Directive({
  selector: '[mlTextBox]',
  standalone: true
})
export class TextBoxDirective {
  @HostBinding('class') private _class = `h-control text-dark border-dark
    border-[1px] border-solid rounded-[5px] outline-none p-[5px] bg-white focus:ring inline-block w-full`;
  @HostBinding('attr.type') private _type = 'text';
}