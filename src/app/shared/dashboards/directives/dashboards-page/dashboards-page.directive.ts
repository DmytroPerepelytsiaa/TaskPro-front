import { Dialog } from '@angular/cdk/dialog';
import { Directive, inject } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { tap } from 'rxjs';

import { DashboardEditModalComponent } from '@shared/dashboards/components';
import { DashboardStoreService } from '@shared/dashboards/services';
import { Dashboard } from '@shared/dashboards/models';

@UntilDestroy()
@Directive()
export abstract class DashboardsPageDirective {
  private dialogService = inject(Dialog);
  dashboardStore = inject(DashboardStoreService);

  openDashboardModal(dashboard?: Dashboard): void {
    const modalRef = this.dialogService.open(DashboardEditModalComponent, { data: { dashboard } });

    modalRef.componentInstance?.createDashboard
      .pipe(
        tap((dashboard) => {
          this.dashboardStore.createDashboard(dashboard);
          modalRef.close();
        }),
        untilDestroyed(this),
      )
      .subscribe();

    modalRef.componentInstance?.editDashboard
      .pipe(
        tap((dashboard) => {
          this.dashboardStore.editDashboard(dashboard);
          modalRef.close();
        }),
        untilDestroyed(this),
      )
      .subscribe();
  }
};
