import { ComponentRef, Directive, EventEmitter, Input, OnDestroy, OnInit, Output, Type, ViewContainerRef } from "@angular/core";
import { Subject, takeUntil } from "rxjs";

type Outputable<T> = T & { [key: string]: EventEmitter<unknown> };

@Directive({
  selector: '[mlComponentRenderer]',
  standalone: true,
  exportAs: 'componentRenderer'
})
export class ComponentRendererDirective<T> implements OnInit, OnDestroy {
  /** Angular component to be rendered */
  @Input({ required: true }) public componentType!: Type<T>;
  /** Angular component inputs object ({ [input: string]: unknown }) */
  @Input() public inputs: { [key: string]: unknown } = {};
  /** Angular component outputs object ({ [output: string]: (args: unknown) => void }) */
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
    this.destroySubject.next(null);
    this.componentRef?.destroy();
    this.componentRef = null;
    this._vcr.clear();
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
        const component = this.componentRef?.instance as Outputable<T>,
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