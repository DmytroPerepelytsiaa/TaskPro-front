import { Directive, EventEmitter, Output } from '@angular/core';

@Directive()
export abstract class SharedModalDirective {
  @Output() closeModal = new EventEmitter<void>();
}
