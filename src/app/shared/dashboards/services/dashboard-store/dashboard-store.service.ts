import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ComponentStore } from '@ngrx/component-store';
import { catchError, combineLatest, Observable, of, switchMap, tap, withLatestFrom } from 'rxjs';

import { Dashboard, DashboardColumn, DashboardFormState } from '@shared/dashboards/models';

import { DashboardApiService } from '../dashboard-api/dashboard-api.service';

export interface DashboardStoreState {
  currentDashboard: Dashboard | null;
  dashboards: Dashboard[];
}

const initialState: DashboardStoreState = {
  currentDashboard: null,
  dashboards: [],
};

@Injectable({ providedIn: 'root' })
export class DashboardStoreService extends ComponentStore<DashboardStoreState> {
  constructor(
    private dashboardApiService: DashboardApiService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {
    super(initialState);

    this.currentDashboard$
      .pipe(
        tap((dashboard) => this.router.navigate([dashboard ? '/dashboard' : '/home', dashboard?.id ?? ''])),
      )
      .subscribe();
  }

  readonly dashboards$ = this.select((state) => state.dashboards);
  readonly currentDashboard$ = this.select((state) => state.currentDashboard);

  readonly setDashboards = this.updater((state, dashboards: Dashboard[]) => ({
    ...state,
    dashboards,
  }));

  readonly setCurrentDashboard = this.updater((state, currentDashboard: Dashboard | null) => ({
    ...state,
    currentDashboard,
  }));

  readonly getDashboards = this.effect((id$: Observable<number>) => 
    id$
      .pipe(
        withLatestFrom(this.dashboards$),
        switchMap(([id]) => combineLatest([of(id), this.dashboardApiService.getDashboards$()])),
        tap(([id, dashboards]) => {
          // TODO: consider parsing dates once before sorting or using a more efficient date comparison method.
          dashboards.forEach((dashboard) => {
            dashboard.columns = dashboard.columns.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

            // TODO: implement order property in the backend
            dashboard.columns.forEach((column) => {
              column.cards = column.cards.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
            });
          });

          this.setDashboards(dashboards);

          const currentDashboard = dashboards.find((dashboard) => dashboard.id === id);

          if (dashboards.length) {
            this.setCurrentDashboard(currentDashboard ?? dashboards[0]);
          } else {
            this.router.navigate(['/']);
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
  );

  readonly createDashboard = this.effect((dashboard$: Observable<DashboardFormState>) => 
    dashboard$
      .pipe(
        switchMap((dashboard) => this.dashboardApiService.addDashboard$(dashboard)),
        withLatestFrom(this.dashboards$),
        tap(([newDashboard, dashboards]) => {
          newDashboard.columns = [];
          this.setDashboards([...dashboards, newDashboard]);
          this.setCurrentDashboard(newDashboard);
          this.router.navigate(['/dashboard', newDashboard.id]);
        }),
        catchError((error: HttpErrorResponse) => {
          const errorMessage = error.error?.message || error.message;

          if (errorMessage) {
            this.snackBar.open(errorMessage, 'Close', { panelClass: 'error-snackbar' });
          }
          
          return of(null);
        }),
      )
  );

  readonly editDashboard = this.effect((dashboard$: Observable<Dashboard>) => 
    dashboard$
      .pipe(
        switchMap((dashboard) => this.dashboardApiService.updateDashboard$(dashboard)),
        withLatestFrom(this.dashboards$),
        tap(([updatedDashboard, dashboards]) => {
          const updatedDashboardIndex = dashboards.findIndex((d) => d.id === updatedDashboard.id);
          dashboards[updatedDashboardIndex] = updatedDashboard;
          this.setDashboards(dashboards);
          this.setCurrentDashboard(updatedDashboard);
        }),
        catchError((error: HttpErrorResponse) => {
          const errorMessage = error.error?.message || error.message;

          if (errorMessage) {
            this.snackBar.open(errorMessage, 'Close', { panelClass: 'error-snackbar' });
          }
          
          return of(null);
        }),
      )
    );

  readonly deleteDashboard = this.effect((dashboard$: Observable<Dashboard>) =>
    dashboard$
      .pipe(
        withLatestFrom(this.dashboards$),
        switchMap(([dashboard, dashboards]) => {
          const updatedDashboards = dashboards.filter((d) => d.id !== dashboard.id);
          this.setDashboards(updatedDashboards);

          if (updatedDashboards.length) {
            this.setCurrentDashboard(updatedDashboards[0]);
          } else {
            this.setCurrentDashboard(null);
          }

          return this.dashboardApiService.deleteDashboard$(dashboard);
        }),
        catchError((error: HttpErrorResponse) => {
          const errorMessage = error.error?.message || error.message;

          if (errorMessage) {
            this.snackBar.open(errorMessage, 'Close', { panelClass: 'error-snackbar' });
          }
          
          return of(null);
        }),
      )
  );

  readonly updateDashboardColumns = this.effect((payload$: Observable<{ column: DashboardColumn, isDeleted: boolean }>) =>
    payload$
      .pipe(
        withLatestFrom(this.currentDashboard$),
        tap(([payload, currentDashboard]) => {
          if (!currentDashboard) {
            return;
          }

          const updatedColumn = currentDashboard.columns.find((c) => c.id === payload.column.id);
          const updatedDashboard = {
            ...currentDashboard,
            columns: updatedColumn ? currentDashboard.columns.map((c) => (c.id === payload.column.id ? payload.column : c)).filter(c => !(c.id === payload.column.id && payload.isDeleted)) : [...currentDashboard.columns, payload.column],
          };

          this.setCurrentDashboard(updatedDashboard);
        }),
      ),
    );
}
