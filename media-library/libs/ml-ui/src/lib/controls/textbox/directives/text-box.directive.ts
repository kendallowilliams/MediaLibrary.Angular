import { Directive, HostBinding } from "@angular/core";

@Directive({
  selector: '[mlTextBox]'
})
export class TextBoxDirective {
  @HostBinding('class') private _class = `h-control text-dark dark:text-light border-dark dark:border-light 
    border-[1px] border-solid rounded-[5px] outline-none p-[5px] bg-light dark:bg-dark focus:ring inline-block w-full`;
  @HostBinding('attr.type') private _type = 'text';
}