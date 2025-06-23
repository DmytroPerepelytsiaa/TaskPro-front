import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ComponentStore } from '@ngrx/component-store';
import { combineLatest, Observable, of, switchMap, tap, withLatestFrom } from 'rxjs';

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
        // TODO: handle error
        withLatestFrom(this.dashboards$),
        switchMap(([id]) => combineLatest([of(id), this.dashboardApiService.getDashboards$()])),
        tap(([id, dashboards]) => {
          this.setDashboards(dashboards);

          const currentDashboard = dashboards.find((dashboard) => dashboard.id === id);

          if (dashboards.length) {
            this.setCurrentDashboard(currentDashboard ?? dashboards[0]);
          } else {
            this.router.navigate(['/']);
          }
        }),
      )
  );

  readonly createDashboard = this.effect((dashboard$: Observable<DashboardFormState>) => 
    dashboard$
      .pipe(
        // TODO: handle error
        switchMap((dashboard) => this.dashboardApiService.addDashboard$(dashboard)),
        withLatestFrom(this.dashboards$),
        tap(([newDashboard, dashboards]) => {
          newDashboard.columns = [];
          this.setDashboards([...dashboards, newDashboard]);
          this.setCurrentDashboard(newDashboard);
          this.router.navigate(['/dashboard', newDashboard.id]);
        }),
      )
  );

  readonly editDashboard = this.effect((dashboard$: Observable<Dashboard>) => 
    dashboard$
      .pipe(
        // TODO: handle error
        withLatestFrom(this.dashboards$),
        switchMap(([dashboard, dashboards]) => {
          const updatedDashboardIndex = dashboards.findIndex((d) => d.id === dashboard.id);
          dashboards[updatedDashboardIndex] = dashboard;
          this.setDashboards(dashboards);
          this.setCurrentDashboard(dashboard);

          return this.dashboardApiService.updateDashboard$(dashboard);
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

          // TODO: handle error
          return this.dashboardApiService.deleteDashboard$(dashboard);
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
