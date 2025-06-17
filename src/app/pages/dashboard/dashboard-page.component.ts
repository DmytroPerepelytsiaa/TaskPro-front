import { Dialog } from '@angular/cdk/dialog';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { switchMap, tap, withLatestFrom } from 'rxjs';

import { DashboardColumnEditModalComponent } from '@shared/dashboards/components';
import { DashboardsModule } from '@shared/dashboards/dashboards.module';
import { DashboardApiService, DashboardStoreService } from '@shared/dashboards/services';
import { ButtonAppearance } from '@shared/ui/models';
import { UiModule } from '@shared/ui/ui.module';
import { Dashboard, DashboardColumn } from '@shared/dashboards/models';

@Component({
  standalone: true,
  selector: 'tp-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    UiModule,
    DashboardsModule,
  ],
})
export class DashboardPageComponent {
  private dialogService = inject(Dialog);
  private dashboardApiService = inject(DashboardApiService);
  private dashboardStoreService = inject(DashboardStoreService);

  ButtonAppearance = ButtonAppearance;
  currentDashboard$ = this.dashboardStoreService.currentDashboard$;

  openColumnModal(column?: DashboardColumn): void {
    const modalRef = this.dialogService.open(DashboardColumnEditModalComponent, { data: { column } });

    modalRef.componentInstance?.createColumn
      .pipe(
        withLatestFrom(this.currentDashboard$),
        switchMap(([name, dashboard]) => {
          modalRef.close();

          return this.dashboardApiService.createColumn$(dashboard as Dashboard, name);
        }),
        tap((column) => this.dashboardStoreService.updateDashboardColumns({ column, isDeleted: false })),
      )
      .subscribe();

      modalRef.componentInstance?.editColumn
        .pipe(
          switchMap((newColumn) => {
            modalRef.close();

            return this.dashboardApiService.editColumn$(newColumn.id, newColumn.name);
          }),
          tap((column) => this.dashboardStoreService.updateDashboardColumns({ column, isDeleted: false })),
        )
        .subscribe();

    // TODO: implement edit logic
  }

  deleteColumn(column: DashboardColumn): void {
    this.dashboardApiService.deleteColumn$(column.id)
      .pipe(
        tap(() => this.dashboardStoreService.updateDashboardColumns({ column, isDeleted: true })),
      )
      .subscribe();
  }
}
