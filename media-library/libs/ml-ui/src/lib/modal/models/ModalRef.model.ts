import { ComponentRef, TemplateRef, Type } from "@angular/core";
import { ModalComponent } from "../modal.component";

export class ModalRef<T> {
  private _componentType?: Type<T>;
  private _template?: TemplateRef<T>;
  private _templateCtx?: unknown;
  private _modalComponentRef?: ComponentRef<ModalComponent<T>>;

  public component?: T;

  public get componentType() : Type<T> | undefined {
    return this._componentType;
  }

  public get template() : TemplateRef<T> | undefined {
    return this._template;
  }

  public get templateCtx() : unknown {
    return this._templateCtx;
  }

  constructor(componentType?: Type<T>, template?: TemplateRef<T>, templateCtx?: unknown) {
    this._componentType = componentType;
    this._template = template;
    this._templateCtx = templateCtx;
  }

  public setModalComponentRef(modalComponentRef: ComponentRef<ModalComponent<T>>) : void {
    this._modalComponentRef = modalComponentRef;
  }

  public hide() : void {
    this._modalComponentRef?.instance.hide();
    this._modalComponentRef?.destroy();
  }
}