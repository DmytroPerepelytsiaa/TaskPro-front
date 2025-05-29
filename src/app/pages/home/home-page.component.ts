import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { tap } from 'rxjs';

import { UiModule } from '@shared/ui/ui.module';
import { DashboardEditModalComponent } from '@shared/dashboards/components';
import { DashboardsStoreService } from '@shared/dashboards/services';
import { DashboardsModule } from '@shared/dashboards/dashboards.module';

@UntilDestroy()
@Component({
  selector: 'tp-home-page',
  templateUrl: './home-page.component.html',
  imports: [
    UiModule,
    DashboardsModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent {
  private dialogService = inject(Dialog);
  private dashboardsStore = inject(DashboardsStoreService);

  openDashboardCreation(): void {
    const modalRef = this.dialogService.open(DashboardEditModalComponent, { data: { isEditMode: false } });

    modalRef.componentInstance?.createDashboard
      .pipe(
        tap((dashboard) => {
          this.dashboardsStore.createDashboard(dashboard);
          modalRef.close();
        }),
        untilDestroyed(this),
      )  
      .subscribe();
  }
}
