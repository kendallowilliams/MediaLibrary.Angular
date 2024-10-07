import { ComponentRef, TemplateRef, Type } from "@angular/core";
import { Modal } from "./modal.interface";

export class ModalRef<T> {
  private _componentType?: Type<T>;
  private _template?: TemplateRef<T>;
  private _templateCtx?: unknown;
  private _modalComponentRef?: ComponentRef<Modal>;

  public component?: T;
  
  public get modal() : Modal | undefined {
    return this._modalComponentRef?.instance;
  }

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

  public set modalComponentRef(modalComponentRef: ComponentRef<Modal>) {
    this._modalComponentRef = modalComponentRef;
  }

  public get modalComponentRef() : ComponentRef<Modal> | undefined {
    return this._modalComponentRef;
  }

  public hide() : void {
    this._modalComponentRef?.instance.hide();
  }
}