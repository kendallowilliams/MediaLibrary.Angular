import { Directive, EventEmitter, Input, OnDestroy, OnInit, Type, ViewContainerRef } from "@angular/core";
import { Subject, takeUntil } from "rxjs";

@Directive({
  selector: '[mlComponentRenderer]',
  standalone: true,
  exportAs: 'componentRenderer'
})
export class ComponentRendererDirective implements OnInit, OnDestroy {
  @Input() public componentType: Type<unknown> | null = null;
  @Input() public inputs: { [key: string]: unknown } = {};
  @Input() public outputs: { [key: string]: (args: unknown) => void } = {};

  private destroySubject = new Subject();

  constructor(private _vcr: ViewContainerRef) {}

  public ngOnInit(): void {
    this.loadComponent();
  }

  public ngOnDestroy(): void {
    this.destroySubject.next(null);
    this.destroySubject.complete();
  }

  public reload(): void {
    this._vcr.clear();
    this.destroySubject.next(null);
    this.loadComponent();
  }

  private loadComponent(): void {
    if (this.componentType) {
      const ref = this._vcr.createComponent(this.componentType),
        component = <{ [key: string]: EventEmitter<unknown> }>ref.instance;

      Object.keys(this.inputs).forEach(key => {
        ref.setInput(key, this.inputs[key]);
      });
      Object.keys(this.outputs).forEach(key => {
        const output = component[key];

        if (output) {
          output.pipe(takeUntil(this.destroySubject)).subscribe(this.outputs[key]);
        } else {
          console.error(`mlComponentRenderer output ${key} missing/invalid.`);
        }
      });
    } else {
      console.error('mlComponentRenderer componentType missing/invalid.');
    }
  }
}