import { NgModule } from '@angular/core';

import { UiModule } from '@shared/ui/ui.module';

import { DashboardEditModalComponent } from './components';

@NgModule({
  declarations: [
    DashboardEditModalComponent,
  ],
  imports: [
    UiModule,
  ],
  exports: [
    DashboardEditModalComponent,
  ],
})
export class DashboardsModule {}
