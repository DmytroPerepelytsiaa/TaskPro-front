import { DIALOG_DATA } from '@angular/cdk/dialog';
import { ChangeDetectionStrategy, Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

import { DashboardColumn } from '@shared/dashboards/models';

@Component({
  selector: 'tp-dashboard-column-edit-modal',
  standalone: false,
  templateUrl: './dashboard-column-edit-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardColumnEditModalComponent implements OnInit {
  constructor(@Inject(DIALOG_DATA) public data: { column: DashboardColumn }) {}

  @Output() createColumn = new EventEmitter<string>();
  @Output() editColumn = new EventEmitter<DashboardColumn>();

  columnName = new FormControl('', { nonNullable: true });

  ngOnInit(): void {
    if (this.data.column) {
      this.columnName.patchValue(this.data.column.name);
    }
  }

  handleSubmit(): void {
    this.data.column ? this.editColumn.emit({ ...this.data.column, name: this.columnName.value }) : this.createColumn.emit(this.columnName.value);
  }
}
