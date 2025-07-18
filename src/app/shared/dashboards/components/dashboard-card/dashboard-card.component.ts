import { Component, EventEmitter, Input, Output } from '@angular/core';

import { 
  CardDeleteActionPayload, 
  CardUpdateActionPayload, 
  ChangeCardColumnPayload, 
  Dashboard, 
  DashboardColumn, 
  DashboardColumnCard,
 } from '@shared/dashboards/models';

@Component({
  selector: 'tp-dashboard-card',
  templateUrl: './dashboard-card.component.html',
  standalone: false,
})
export class DashboardCardComponent {
  @Input() card!: DashboardColumnCard;
  @Input() currentDashboard!: Dashboard;
  @Input() currentColumn!: DashboardColumn;
  @Input() openedPopupCardId: number | null = null;

  @Output() changeCardColumn = new EventEmitter<ChangeCardColumnPayload>();
  @Output() openCardModal = new EventEmitter<CardUpdateActionPayload>();
  @Output() deleteCard = new EventEmitter<CardDeleteActionPayload>();
}
