import { ChangeDetectionStrategy, Component } from '@angular/core';

import { UiModule } from '@shared/ui/ui.module';

@Component({
  standalone: true,
  selector: 'tp-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [UiModule],
})
export class DashboardPageComponent {}
