import { DIALOG_DATA } from '@angular/cdk/dialog';
import { ChangeDetectionStrategy, Component, EventEmitter, Inject, inject, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { DashboardBackgrounds, DashboardForm, DashboardFormState, DashboardIcons } from '@shared/dashboards/models';
import { trimValidator } from '@shared/validators';

@Component({
  standalone: false,
  selector: 'tp-dashboard-edit-modal',
  templateUrl: './dashboard-edit-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardEditModalComponent {
  constructor(@Inject(DIALOG_DATA) public data: { isEditMode: boolean }) {}

  @Output() editDashboard = new EventEmitter<DashboardFormState>();
  @Output() createDashboard = new EventEmitter<DashboardFormState>();

  private formBuilder = inject(FormBuilder);

  dashboardIcons = Object.values(DashboardIcons);
  dashboardBackgrounds = Object.values(DashboardBackgrounds);
  DashboardBackgrounds = DashboardBackgrounds;

  dashboardForm: FormGroup<DashboardForm> = this.formBuilder.group<DashboardForm>({
    name: this.formBuilder.nonNullable.control('', [trimValidator(6, 64)]),
    icon: this.formBuilder.nonNullable.control(DashboardIcons.Project),
    background: this.formBuilder.nonNullable.control(DashboardBackgrounds.NoBg), 
  });

  setIcon(icon: DashboardIcons): void {
    this.dashboardForm.controls.icon.setValue(icon);
  }

  setBackground(background: DashboardBackgrounds): void {
    this.dashboardForm.controls.background.setValue(background);
  }

  onSubmit(): void {
    const value = this.dashboardForm.getRawValue();
    
    this.data.isEditMode ? this.editDashboard.emit(value) : this.createDashboard.emit(value);
  }
}
