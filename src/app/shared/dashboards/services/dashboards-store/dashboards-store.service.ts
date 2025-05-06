import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { filter, switchMap, tap, withLatestFrom } from 'rxjs';

import { Dashboard } from '@shared/dashboards/models';

import { DashboardsApiService } from '../dashboards-api/dashboards-api.service';

export interface DashboardsStoreState {
  dashboards: Dashboard[];
}

const initialState: DashboardsStoreState = {
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

  readonly setDashboards = this.updater((state, dashboards: Dashboard[]) => ({
    ...state,
    dashboards,
  }));

  readonly getDashboards = this.effect((trigger$) => 
    trigger$
      .pipe(
        withLatestFrom(this.dashboards$),
        filter(([_, dashboards]) => !dashboards.length),
        switchMap(() => this.dashboardsApiService.getDashboards$()),
        tap((dashboards) => this.setDashboards(dashboards)),
      )
  );
}
