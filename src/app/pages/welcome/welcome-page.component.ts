import { ChangeDetectionStrategy, Component } from '@angular/core';

import { UiModule } from '@shared/ui/ui.module';

@Component({
  selector: 'tp-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss'],
  imports: [UiModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WelcomePageComponent {}