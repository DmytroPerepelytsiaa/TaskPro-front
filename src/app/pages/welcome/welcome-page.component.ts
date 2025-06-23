import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ButtonAppearance } from '@shared/ui/models';
import { UiModule } from '@shared/ui/ui.module';

@Component({
  selector: 'tp-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss'],
  imports: [
    UiModule,
    RouterModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WelcomePageComponent implements OnInit {
  ButtonAppearance = ButtonAppearance;

  ngOnInit(): void {
    document.body.className = '';
    document.body.classList.add('dark-theme');
  }
}
