import { DashboardColumn, DashboardColumnCard } from './dashboard.model';

export interface ChangeCardColumnPayload {
  card: DashboardColumnCard;
  columnForChoose: DashboardColumn;
  currentColumn: DashboardColumn;
}

export interface CardUpdateActionPayload {
  currentColumn: DashboardColumn;
  card: DashboardColumnCard | null;
}

export interface CardDeleteActionPayload {
  currentColumn: DashboardColumn;
  card: DashboardColumnCard;
}
