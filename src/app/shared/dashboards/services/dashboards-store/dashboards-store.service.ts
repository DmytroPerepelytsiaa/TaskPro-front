import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ComponentStore } from '@ngrx/component-store';
import { combineLatest, filter, Observable, of, switchMap, tap, withLatestFrom } from 'rxjs';

import { Dashboard, DashboardFormState } from '@shared/dashboards/models';

import { DashboardsApiService } from '../dashboards-api/dashboards-api.service';

export interface DashboardsStoreState {
  currentDashboard: Dashboard | null;
  dashboards: Dashboard[];
}

const initialState: DashboardsStoreState = {
  currentDashboard: null,
  dashboards: [],
};

@Injectable({ providedIn: 'root' })
export class DashboardsStoreService extends ComponentStore<DashboardsStoreState> {
  constructor(
    private dashboardsApiService: DashboardsApiService,
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
        withLatestFrom(this.dashboards$),
        filter(([_, dashboards]) => !dashboards.length),
        switchMap(([id]) => combineLatest([of(id), this.dashboardsApiService.getDashboards$()])),
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
        switchMap((dashboard) => this.dashboardsApiService.addDashboard$(dashboard)),
        withLatestFrom(this.dashboards$),
        tap(([newDashboard, dashboards]) => {
          this.setDashboards([...dashboards, newDashboard]);
          this.setCurrentDashboard(newDashboard);
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
          return this.dashboardsApiService.deleteDashboard$(dashboard);
        }),
      )
  );
}
