import { EventEmitter } from "@angular/core";
import { ModalConfig } from "./modal-config.model";

export interface Modal {
  modalClose: EventEmitter<Event>;
  modalCancel: EventEmitter<Event>;
  show: () => void;
  hide: () => void;
  config: ModalConfig;
}