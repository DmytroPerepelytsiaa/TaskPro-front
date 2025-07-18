import { DIALOG_DATA } from '@angular/cdk/dialog';
import { ChangeDetectionStrategy, Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

import { DashboardColumn } from '@shared/dashboards/models';
import { SharedModalDirective } from '@shared/ui/directives';
import { trimValidator } from '@shared/validators';

@Component({
  selector: 'tp-dashboard-column-edit-modal',
  standalone: false,
  templateUrl: './dashboard-column-edit-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardColumnEditModalComponent extends SharedModalDirective implements OnInit {
  @Output() createColumn = new EventEmitter<string>();
  @Output() editColumn = new EventEmitter<DashboardColumn>();

  dialogData = inject<{ column?: DashboardColumn }>(DIALOG_DATA);

  columnName = new FormControl('', { nonNullable: true, validators: [trimValidator(2, 64)] },);

  ngOnInit(): void {
    if (this.dialogData.column) {
      this.columnName.patchValue(this.dialogData.column.name);
    }
  }

  handleSubmit(): void {
    this.dialogData.column ? this.editColumn.emit({ ...this.dialogData.column, name: this.columnName.value }) : this.createColumn.emit(this.columnName.value);
  }
}
