import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { UiModule } from '@shared/ui/ui.module';

import { 
  DashboardCardEditModalComponent, 
  DashboardColumnEditModalComponent, 
  DashboardEditModalComponent,
} from './components';
import { GetFormattedDatePipe } from './pipes';

@NgModule({
  declarations: [
    DashboardEditModalComponent,
    DashboardColumnEditModalComponent,
    DashboardCardEditModalComponent,
    GetFormattedDatePipe,
  ],
  imports: [
    CommonModule,
    UiModule,
    ReactiveFormsModule,
  ],
  exports: [
    DashboardEditModalComponent,
    DashboardColumnEditModalComponent,
    DashboardCardEditModalComponent,
    GetFormattedDatePipe,
  ],
})
export class DashboardsModule {}
