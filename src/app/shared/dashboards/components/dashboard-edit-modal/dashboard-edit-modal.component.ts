import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { DashboardBackgrounds, DashboardForm, DashboardIcons } from '@shared/dashboards/models';

@Component({
  standalone: false,
  selector: 'tp-dashboard-edit-modal',
  templateUrl: './dashboard-edit-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardEditModalComponent {
  private formBuilder = inject(FormBuilder);

  dashboardForm: FormGroup<DashboardForm> = this.formBuilder.group<DashboardForm>({
    name: this.formBuilder.nonNullable.control(''),
    icon: this.formBuilder.nonNullable.control(DashboardIcons.Project),
    background: this.formBuilder.nonNullable.control(DashboardBackgrounds.NoBg), 
  });
}
