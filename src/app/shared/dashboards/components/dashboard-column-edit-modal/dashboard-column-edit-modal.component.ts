import { DIALOG_DATA } from '@angular/cdk/dialog';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'tp-dashboard-column-edit-modal',
  standalone: false,
  templateUrl: './dashboard-column-edit-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardColumnEditModalComponent {
  constructor(@Inject(DIALOG_DATA) public data: { isEditMode: boolean }) {}

  columnTitle = new FormControl('');
}
