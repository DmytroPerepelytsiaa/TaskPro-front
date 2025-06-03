import { Dialog } from '@angular/cdk/dialog';
import { Directive, inject } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { tap } from 'rxjs';

import { DashboardEditModalComponent } from '@shared/dashboards/components';
import { DashboardsStoreService } from '@shared/dashboards/services';

@UntilDestroy()
@Directive()
export abstract class DashboardsPageDirective {
  private dialogService = inject(Dialog);
  dashboardsStore = inject(DashboardsStoreService);

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
};
