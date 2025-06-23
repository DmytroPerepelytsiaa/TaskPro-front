import { ChangeDetectionStrategy, Component } from '@angular/core';

import { UiModule } from '@shared/ui/ui.module';
import { DashboardsModule } from '@shared/dashboards/dashboards.module';
import { DashboardsPageDirective } from '@shared/dashboards/directives';

@Component({
  selector: 'tp-home-page',
  templateUrl: './home-page.component.html',
  imports: [
    UiModule,
    DashboardsModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent extends DashboardsPageDirective {}
