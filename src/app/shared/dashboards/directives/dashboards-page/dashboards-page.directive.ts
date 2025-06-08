import { Dialog } from '@angular/cdk/dialog';
import { Directive, inject } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { tap } from 'rxjs';

import { DashboardEditModalComponent } from '@shared/dashboards/components';
import { DashboardsStoreService } from '@shared/dashboards/services';
import { Dashboard } from '@shared/dashboards/models';

@UntilDestroy()
@Directive()
export abstract class DashboardsPageDirective {
  private dialogService = inject(Dialog);
  dashboardsStore = inject(DashboardsStoreService);

  openDashboardModal(dashboard?: Dashboard): void {
    const modalRef = this.dialogService.open(DashboardEditModalComponent, { data: { dashboard } });

    modalRef.componentInstance?.createDashboard
      .pipe(
        tap((dashboard) => {
          this.dashboardsStore.createDashboard(dashboard);
          modalRef.close();
        }),
        untilDestroyed(this),
      )
      .subscribe();

    modalRef.componentInstance?.editDashboard
      .pipe(
        tap((dashboard) => {
          this.dashboardsStore.editDashboard(dashboard);
          modalRef.close();
        }),
        untilDestroyed(this),
      )
      .subscribe();
  }
};
