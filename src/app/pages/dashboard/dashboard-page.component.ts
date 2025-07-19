import { Dialog } from '@angular/cdk/dialog';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { catchError, of, switchMap, tap, withLatestFrom } from 'rxjs';

import { DashboardCardEditModalComponent, DashboardColumnEditModalComponent } from '@shared/dashboards/components';
import { DashboardsModule } from '@shared/dashboards/dashboards.module';
import { DashboardApiService, DashboardStoreService } from '@shared/dashboards/services';
import { ButtonAppearance } from '@shared/ui/models';
import { UiModule } from '@shared/ui/ui.module';
import { 
  CardDeleteActionPayload, 
  CardPriority, 
  CardUpdateActionPayload, 
  ChangeCardColumnPayload, 
  Dashboard, 
  DashboardColumn,
} from '@shared/dashboards/models';
import { FilterArrayPipe } from '@shared/pipes';
import { ConfirmationDialogComponent } from '@shared/ui/components';

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
    FilterArrayPipe,
    MatTooltipModule,
  ],
})
export class DashboardPageComponent {
  private snackBar = inject(MatSnackBar);
  private dialogService = inject(Dialog);
  private dashboardApiService = inject(DashboardApiService);
  private dashboardStoreService = inject(DashboardStoreService);

  ButtonAppearance = ButtonAppearance;
  CardPriority = CardPriority;
  currentDashboard$ = this.dashboardStoreService.currentDashboard$;
  openedPopupCardId: number | null = null;
  cardPriorities = Object.values(CardPriority);
  cardFilter: null | CardPriority = null;
  isFiltersOpen = false;

  openColumnModal(column?: DashboardColumn): void {
    const modalRef = this.dialogService.open(DashboardColumnEditModalComponent, { data: { column } });

    modalRef.componentInstance?.createColumn
      .pipe(
        withLatestFrom(this.currentDashboard$),
        switchMap(([name, dashboard]) => {
          modalRef.close();

          return this.dashboardApiService.createColumn$(dashboard as Dashboard, name);
        }),
        tap((column) => {
          column.cards = [];
          this.dashboardStoreService.updateDashboardColumns({ column, isDeleted: false });
        }),
        catchError((error: HttpErrorResponse) => {
          const errorMessage = error.error?.message || error.message;

          if (errorMessage) {
            this.snackBar.open(errorMessage, 'Close', { panelClass: 'error-snackbar' });
          }
          
          return of(null);
        }),
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
          catchError((error: HttpErrorResponse) => {
            const errorMessage = error.error?.message || error.message;

            if (errorMessage) {
              this.snackBar.open(errorMessage, 'Close', { panelClass: 'error-snackbar' });
            }
            
            return of(null);
          }),
          untilDestroyed(this),
        )
        .subscribe();

      modalRef.componentInstance?.closeModal
        .pipe(
          tap(() => modalRef.close()),
          untilDestroyed(this),
        )
        .subscribe();
  }

  deleteColumn(column: DashboardColumn): void {
    const modalRef = this.dialogService.open(ConfirmationDialogComponent, { data: { 
      confirmationText: `Are you sure you want to delete <span class="text-red-1 truncate inline-block max-w-[120px] leading-4">${column.name}</span> column?`,
    }});

    modalRef.componentInstance?.confirm
      .pipe(
        switchMap(() => this.dashboardApiService.deleteColumn$(column.id)),
        tap(() => {
          this.dashboardStoreService.updateDashboardColumns({ column, isDeleted: true });
          modalRef.close();
        }),
        catchError((error: HttpErrorResponse) => {
          const errorMessage = error.error?.message || error.message;

          if (errorMessage) {
            this.snackBar.open(errorMessage, 'Close', { panelClass: 'error-snackbar' });
          }
          
          return of(null);
        }),
        untilDestroyed(this),
      )
      .subscribe();

      modalRef.componentInstance?.closeModal
        .pipe(
          tap(() => modalRef.close()),
          untilDestroyed(this),
        )
        .subscribe();
  }

  openCardModal({ currentColumn: column, card }: CardUpdateActionPayload): void {
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
        catchError((error: HttpErrorResponse) => {
          const errorMessage = error.error?.message || error.message;

          if (errorMessage) {
            this.snackBar.open(errorMessage, 'Close', { panelClass: 'error-snackbar' });
          }
          
          return of(null);
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
        catchError((error: HttpErrorResponse) => {
          const errorMessage = error.error?.message || error.message;

          if (errorMessage) {
            this.snackBar.open(errorMessage, 'Close', { panelClass: 'error-snackbar' });
          }
          
          return of(null);
        }),
      )
      .subscribe();

    modalRef.componentInstance?.closeModal
      .pipe(
        tap(() => modalRef.close()),
        untilDestroyed(this),
      )
      .subscribe();
  }

  deleteCard({ currentColumn: column, card }: CardDeleteActionPayload): void {
    const modalRef = this.dialogService.open(ConfirmationDialogComponent, { data: { 
      confirmationText: `
        Are you sure you want to delete <span class="text-red-1 truncate inline-block max-w-[120px] leading-4">${card.name}</span> card from <span class="text-red-1 truncate inline-block max-w-[120px] leading-4">${column.name}</span> column?
      `,
    }});

    modalRef.componentInstance?.confirm
      .pipe(
        switchMap(() => this.dashboardApiService.deleteCard$(card)),
        tap(() => {
          column.cards = column.cards.filter(c => c.id !== card.id);
          this.dashboardStoreService.updateDashboardColumns({ column, isDeleted: false });
          modalRef.close();
        }),
        catchError((error: HttpErrorResponse) => {
          const errorMessage = error.error?.message || error.message;

          if (errorMessage) {
            this.snackBar.open(errorMessage, 'Close', { panelClass: 'error-snackbar' });
          }
          
          return of(null);
        }),
        untilDestroyed(this),
      )
      .subscribe();

      modalRef.componentInstance?.closeModal
        .pipe(
          tap(() => modalRef.close()),
          untilDestroyed(this),
        )
        .subscribe();
  }

  changeCardColumn({ card, columnForChoose, currentColumn }: ChangeCardColumnPayload): void {
    this.dashboardApiService.editCard$(card, columnForChoose)
      .pipe(
        tap((updatedCard) => {
          const updatedNewColumn = { ...columnForChoose, cards: [...columnForChoose.cards, updatedCard] };
          const updatedOldColumn = { ...currentColumn, cards: currentColumn.cards.filter(c => c.id !== updatedCard.id) };

          this.dashboardStoreService.updateDashboardColumns({ column: updatedNewColumn, isDeleted: false });
          this.dashboardStoreService.updateDashboardColumns({ column: updatedOldColumn, isDeleted: false });
          this.openedPopupCardId = null;
        }),
        catchError((error: HttpErrorResponse) => {
          const errorMessage = error.error?.message || error.message;

          if (errorMessage) {
            this.snackBar.open(errorMessage, 'Close', { panelClass: 'error-snackbar' });
          }
          
          return of(null);
        }),
      )
      .subscribe();
  }
}
