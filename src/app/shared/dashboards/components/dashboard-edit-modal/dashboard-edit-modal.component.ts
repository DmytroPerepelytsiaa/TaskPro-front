import { DIALOG_DATA } from '@angular/cdk/dialog';
import { ChangeDetectionStrategy, Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Dashboard, DashboardBackgrounds, DashboardForm, DashboardFormState, DashboardIcons } from '@shared/dashboards/models';
import { trimValidator } from '@shared/validators';

@Component({
  standalone: false,
  selector: 'tp-dashboard-edit-modal',
  templateUrl: './dashboard-edit-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardEditModalComponent implements OnInit {
  @Output() editDashboard = new EventEmitter<Dashboard>();
  @Output() createDashboard = new EventEmitter<DashboardFormState>();

  private formBuilder = inject(FormBuilder);

  dialogData = inject<{ dashboard?: Dashboard }>(DIALOG_DATA);

  dashboardIcons = Object.values(DashboardIcons);
  dashboardBackgrounds = Object.values(DashboardBackgrounds);
  DashboardBackgrounds = DashboardBackgrounds;

  dashboardForm: FormGroup<DashboardForm> = this.formBuilder.group<DashboardForm>({
    name: this.formBuilder.nonNullable.control('', [trimValidator(6, 64)]),
    icon: this.formBuilder.nonNullable.control(DashboardIcons.Project),
    background: this.formBuilder.nonNullable.control(DashboardBackgrounds.NoBg), 
  });

  ngOnInit(): void {
    if (this.dialogData.dashboard) {
      this.dashboardForm.patchValue({
        name: this.dialogData.dashboard.name,
        icon: this.dialogData.dashboard.icon,
        background: this.dialogData.dashboard.background,
      });
    }
  }

  setIcon(icon: DashboardIcons): void {
    this.dashboardForm.controls.icon.setValue(icon);
  }

  setBackground(background: DashboardBackgrounds): void {
    this.dashboardForm.controls.background.setValue(background);
  }

  onSubmit(): void {
    const value = this.dashboardForm.getRawValue();
    
    this.dialogData.dashboard ? this.editDashboard.emit({ ...this.dialogData.dashboard, ...value }) : this.createDashboard.emit(value);
  }
}
