import { NgModule } from '@angular/core';

import { UiModule } from '@shared/ui/ui.module';

import { DashboardColumnEditModalComponent, DashboardEditModalComponent } from './components';

@NgModule({
  declarations: [
    DashboardEditModalComponent,
    DashboardColumnEditModalComponent
  ],
  imports: [
    UiModule,
  ],
  exports: [
    DashboardEditModalComponent,
    DashboardColumnEditModalComponent,
  ],
})
export class DashboardsModule {}
