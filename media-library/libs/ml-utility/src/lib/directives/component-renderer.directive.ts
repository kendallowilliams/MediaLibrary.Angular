import { ComponentRef, Directive, EventEmitter, Input, OnDestroy, OnInit, Output, Type, ViewContainerRef } from "@angular/core";
import { Subject, takeUntil } from "rxjs";

@Directive({
  selector: '[mlComponentRenderer]',
  standalone: true,
  exportAs: 'componentRenderer'
})
export class ComponentRendererDirective<T> implements OnInit, OnDestroy {
  @Input() public componentType: Type<T> | null = null;
  @Input() public inputs: { [key: string]: unknown } = {};
  @Input() public outputs: { [key: string]: (args: unknown) => void } = {};

  @Output() public componentReload = new EventEmitter<T>();

  public get component(): T | undefined {
    return this.componentRef?.instance;
  }
  private componentRef: ComponentRef<T> | null = null;
  private destroySubject = new Subject();

  constructor(private _vcr: ViewContainerRef) {}

  public ngOnInit(): void {
    this.loadComponent();
  }

  public ngOnDestroy(): void {
    this.destroySubject.next(null);
    this.destroySubject.complete();
    this.componentRef?.destroy();
  }

  public reload(): void {
    this._vcr.clear();
    this.destroySubject.next(null);
    this.componentRef?.destroy();
    this.componentRef = null;
    this.loadComponent();
    this.componentReload.emit(this.component)
  }

  private loadComponent(): void {
    if (this.componentType) {
      this.componentRef = this._vcr.createComponent(this.componentType);

      Object.keys(this.inputs).forEach(key => {
        this.componentRef?.setInput(key, this.inputs[key]);
      });
      Object.keys(this.outputs).forEach(key => {
        const component = <{ [key: string]: EventEmitter<unknown> }>this.componentRef?.instance,
          output = component?.[key];

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