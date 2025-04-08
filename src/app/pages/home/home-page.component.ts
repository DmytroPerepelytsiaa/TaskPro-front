import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { UsersService } from '@shared/auth/services';
import { UiModule } from '@shared/ui/ui.module';

@Component({
  selector: 'tp-home-page',
  templateUrl: './home-page.component.html',
  imports: [
    CommonModule,
    UiModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent {
  private usersService = inject(UsersService);

  user$ = this.usersService.user$;
}
