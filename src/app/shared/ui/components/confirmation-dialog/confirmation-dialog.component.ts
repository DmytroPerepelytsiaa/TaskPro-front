import { DIALOG_DATA } from '@angular/cdk/dialog';
import { ChangeDetectionStrategy, Component, EventEmitter, inject, Output } from '@angular/core';

import { SharedModalDirective } from '@shared/ui/directives';
import { ButtonAppearance } from '@shared/ui/models';

@Component({
  selector: 'tp-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmationDialogComponent extends SharedModalDirective {
  @Output() confirm = new EventEmitter<void>();

  dialogData = inject<{ confirmationText: string }>(DIALOG_DATA);
  
  ButtonAppearance = ButtonAppearance;
}
