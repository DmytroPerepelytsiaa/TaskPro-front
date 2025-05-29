import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { filter, Observable, switchMap, tap, withLatestFrom } from 'rxjs';

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
  ) {
    super(initialState);
  }

  readonly dashboards$ = this.select((state) => state.dashboards);
  readonly currentDashboard$ = this.select((state) => state.currentDashboard);

  readonly setDashboards = this.updater((state, dashboards: Dashboard[]) => ({
    ...state,
    dashboards,
  }));

  readonly setCurrentDashboard = this.updater((state, currentDashboard: Dashboard) => ({
    ...state,
    currentDashboard,
  }));

  readonly getDashboards = this.effect((trigger$) => 
    trigger$
      .pipe(
        withLatestFrom(this.dashboards$),
        filter(([_, dashboards]) => !dashboards.length),
        switchMap(() => this.dashboardsApiService.getDashboards$()),
        tap((dashboards) => {
          this.setDashboards(dashboards);
          this.setCurrentDashboard(dashboards[0]);
        }),
      )
  );

  readonly createDashboard = this.effect((dashboard$: Observable<DashboardFormState>) => 
    dashboard$
      .pipe(
        switchMap((dashboard) => this.dashboardsApiService.addDashboard$(dashboard)),
        withLatestFrom(this.dashboards$),
        tap(([newDashboard, dashboards]) => this.setDashboards([...dashboards, newDashboard])),
      )
  );
}
