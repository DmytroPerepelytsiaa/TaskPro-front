import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatTooltipModule } from '@angular/material/tooltip';

import { UiModule } from '@shared/ui/ui.module';
import { DatesModule } from '@shared/dates/dates.module';

import { 
  CardPriorityCircleComponent,
  DashboardCardComponent,
  DashboardCardEditModalComponent, 
  DashboardColumnEditModalComponent, 
  DashboardEditModalComponent,
} from './components';
import { DashboardBackgroundDirective } from './directives';

@NgModule({
  declarations: [
    DashboardEditModalComponent,
    DashboardColumnEditModalComponent,
    DashboardCardEditModalComponent,
    DashboardBackgroundDirective,
    CardPriorityCircleComponent,
    DashboardCardComponent,
  ],
  imports: [
    CommonModule,
    UiModule,
    ReactiveFormsModule,
    OverlayModule,
    DatesModule,
    MatTooltipModule,
  ],
  exports: [
    DashboardEditModalComponent,
    DashboardColumnEditModalComponent,
    DashboardCardEditModalComponent,
    DashboardBackgroundDirective,
    CardPriorityCircleComponent,
    DashboardCardComponent,
  ],
})
export class DashboardsModule {}
