import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from "@angular/core";

@Component({
  selector: 'ml-sample',
  template: `
    <div>
      <div>Input One: {{inputOne}}</div>
      <div>Output One: <button type="button" (click)="handleOutputOneClick()">Click Me!</button></div>
      <div>Timestamp: {{timestamp}}</div>
    </div>
  `,
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SampleComponent {
  @Input() public inputOne = '';

  @Output() public outputOne = new EventEmitter<string>();

  public timestamp = new Date().toString();

  public handleOutputOneClick(): void {
    this.outputOne.emit('Output One is here!');
  }
}