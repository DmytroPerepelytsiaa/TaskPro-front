import { Dialog } from '@angular/cdk/dialog';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { switchMap, tap, withLatestFrom } from 'rxjs';

import { DashboardCardEditModalComponent, DashboardColumnEditModalComponent } from '@shared/dashboards/components';
import { DashboardsModule } from '@shared/dashboards/dashboards.module';
import { DashboardApiService, DashboardStoreService } from '@shared/dashboards/services';
import { ButtonAppearance } from '@shared/ui/models';
import { UiModule } from '@shared/ui/ui.module';
import { CardPriority, Dashboard, DashboardColumn, DashboardColumnCard } from '@shared/dashboards/models';

@UntilDestroy()
@Component({
  standalone: true,
  selector: 'tp-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    UiModule,
    DashboardsModule,
    OverlayModule,
  ],
})
export class DashboardPageComponent {
  private dialogService = inject(Dialog);
  private dashboardApiService = inject(DashboardApiService);
  private dashboardStoreService = inject(DashboardStoreService);

  ButtonAppearance = ButtonAppearance;
  CardPriority = CardPriority;
  currentDashboard$ = this.dashboardStoreService.currentDashboard$;
  openedPopupCardId: number | null = null;

  openColumnModal(column?: DashboardColumn): void {
    // TODO: add error handling
    const modalRef = this.dialogService.open(DashboardColumnEditModalComponent, { data: { column } });

    modalRef.componentInstance?.createColumn
      .pipe(
        withLatestFrom(this.currentDashboard$),
        switchMap(([name, dashboard]) => {
          modalRef.close();

          return this.dashboardApiService.createColumn$(dashboard as Dashboard, name);
        }),
        tap((column) => this.dashboardStoreService.updateDashboardColumns({ column, isDeleted: false })),
        untilDestroyed(this),
      )
      .subscribe();

      modalRef.componentInstance?.editColumn
        .pipe(
          switchMap((newColumn) => {
            modalRef.close();

            return this.dashboardApiService.editColumn$(newColumn.id, newColumn.name);
          }),
          tap((column) => this.dashboardStoreService.updateDashboardColumns({ column, isDeleted: false })),
          untilDestroyed(this),
        )
        .subscribe();
  }

  deleteColumn(column: DashboardColumn): void {
    // TODO: add error handling and confirmation dialog
    this.dashboardApiService.deleteColumn$(column.id)
      .pipe(
        tap(() => this.dashboardStoreService.updateDashboardColumns({ column, isDeleted: true })),
      )
      .subscribe();
  }

  openCardModal(column: DashboardColumn, card?: DashboardColumnCard): void {
    // TODO: add error handling
    const modalRef = this.dialogService.open(DashboardCardEditModalComponent, { data: { card } });

    modalRef.componentInstance?.createCard
      .pipe(
        switchMap((card) => {
          modalRef.close();
          
          return this.dashboardApiService.addCard$(card, column);
        }),
        tap((newCard) => {
          column.cards.push(newCard);
          this.dashboardStoreService.updateDashboardColumns({ column, isDeleted: false });
        }),
        untilDestroyed(this),
      )
      .subscribe();

    modalRef.componentInstance?.editCard
      .pipe(
        switchMap((card) => {
          modalRef.close();

          return this.dashboardApiService.editCard$(card, column);
        }),
        tap((updatedCard) => {
          const cardIndex = column.cards.findIndex(c => c.id === updatedCard.id);

          if (cardIndex !== -1) {
            column.cards[cardIndex] = updatedCard;
            this.dashboardStoreService.updateDashboardColumns({ column, isDeleted: false });
          }
        }),
      )
      .subscribe();
  }

  deleteCard(column: DashboardColumn, card: DashboardColumnCard): void {
    // TODO: add error handling and confirmation dialog
    this.dashboardApiService.deleteCard$(card)
      .pipe(
        tap(() => {
          column.cards = column.cards.filter(c => c.id !== card.id);
          this.dashboardStoreService.updateDashboardColumns({ column, isDeleted: false });
        }),
      )
      .subscribe();
  }

  changeCardColumn(card: DashboardColumnCard, newColumn: DashboardColumn, oldColumn: DashboardColumn): void {
    // TODO: add error handling
    this.dashboardApiService.editCard$(card, newColumn)
      .pipe(
        tap((updatedCard) => {
          const updatedNewColumn = { ...newColumn, cards: [...newColumn.cards, updatedCard] };
          const updatedOldColumn = { ...oldColumn, cards: oldColumn.cards.filter(c => c.id !== updatedCard.id) };

          this.dashboardStoreService.updateDashboardColumns({ column: updatedNewColumn, isDeleted: false });
          this.dashboardStoreService.updateDashboardColumns({ column: updatedOldColumn, isDeleted: false });
          this.openedPopupCardId = null;
        }),
      )
      .subscribe();
  }
}
