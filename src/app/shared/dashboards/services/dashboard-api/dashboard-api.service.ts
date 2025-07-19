import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@environments/environment';

import { Dashboard, DashboardCardFormState, DashboardColumn, DashboardColumnCard, DashboardFormState } from '../../models';

@Injectable({
  providedIn: 'root',
})
export class DashboardApiService {
  constructor(
    private http: HttpClient,
  ) {}

  getDashboards$(): Observable<Dashboard[]> {
    return this.http.get<Dashboard[]>(environment.baseURL + '/dashboards');
  }

  addDashboard$(dashboard: DashboardFormState): Observable<Dashboard> {
    return this.http.post<Dashboard>(environment.baseURL + '/dashboards', dashboard);
  }

  updateDashboard$(dashboard: Dashboard): Observable<Dashboard> {
    const { columns: _, ...dashboardPayload } = dashboard;
    
    return this.http.patch<Dashboard>(environment.baseURL + '/dashboards/' + dashboard.id, dashboardPayload);
  }

  deleteDashboard$(dashboard: Dashboard): Observable<null> {
    return this.http.delete<null>(environment.baseURL + '/dashboards/' + dashboard.id);
  }

  createColumn$(dashboard: Dashboard, name: string): Observable<DashboardColumn> {
    return this.http.post<DashboardColumn>(environment.baseURL + '/columns', { dashboardId: dashboard.id, name });
  }

  editColumn$(id: number, name: string): Observable<DashboardColumn> {
    return this.http.patch<DashboardColumn>(environment.baseURL + '/columns/' + id, { name });
  }

  deleteColumn$(id: number): Observable<null> {
    return this.http.delete<null>(environment.baseURL + '/columns/' + id);
  }

  addCard$(card: DashboardCardFormState, column: DashboardColumn): Observable<DashboardColumnCard> {
    return this.http.post<DashboardColumnCard>(environment.baseURL + '/cards', { columnId: column.id, ...card });
  }

  editCard$(card: DashboardColumnCard, column: DashboardColumn): Observable<DashboardColumnCard> {
    return this.http.patch<DashboardColumnCard>(environment.baseURL + '/cards/' + card.id, { columnId: column.id, ...card });
  }

  deleteCard$(card: DashboardColumnCard): Observable<null> {
    return this.http.delete<null>(environment.baseURL + '/cards/' + card.id);
  }
}
