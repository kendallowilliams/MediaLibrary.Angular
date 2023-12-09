import { EventEmitter } from "@angular/core";

export interface Modal {
  static: boolean;
  modalClose: EventEmitter<Event>;
  modalCancel: EventEmitter<Event>;
  show: () => void;
  hide: () => void;
}