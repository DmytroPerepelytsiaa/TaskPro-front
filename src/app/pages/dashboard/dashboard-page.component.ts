import { Dialog } from '@angular/cdk/dialog';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { DashboardColumnEditModalComponent } from '@shared/dashboards/components';
import { DashboardsModule } from '@shared/dashboards/dashboards.module';
import { ButtonAppearance } from '@shared/ui/models';
import { UiModule } from '@shared/ui/ui.module';

@Component({
  standalone: true,
  selector: 'tp-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    UiModule,
    DashboardsModule,
  ],
})
export class DashboardPageComponent {
  private dialogService = inject(Dialog);

  ButtonAppearance = ButtonAppearance;

  openColumnCreation(): void {
    const modalRef = this.dialogService.open(DashboardColumnEditModalComponent, { data: { isEditMode: false } });
  }
}
