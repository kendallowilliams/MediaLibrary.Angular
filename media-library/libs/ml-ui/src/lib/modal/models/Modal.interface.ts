import { EventEmitter } from "@angular/core";
import { ModalConfig } from "./ModalConfig.model";

export interface Modal {
  modalClose: EventEmitter<Event>;
  modalCancel: EventEmitter<Event>;
  show: () => void;
  hide: () => void;
  config: ModalConfig<never>;
}