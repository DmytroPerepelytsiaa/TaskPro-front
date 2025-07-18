import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';

import { UiModule } from '@shared/ui/ui.module';
import { DatesModule } from '@shared/dates/dates.module';

import { 
  CardPriorityCircleComponent,
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
  ],
  imports: [
    CommonModule,
    UiModule,
    ReactiveFormsModule,
    OverlayModule,
    DatesModule,
  ],
  exports: [
    DashboardEditModalComponent,
    DashboardColumnEditModalComponent,
    DashboardCardEditModalComponent,
    DashboardBackgroundDirective,
    CardPriorityCircleComponent,
  ],
})
export class DashboardsModule {}
