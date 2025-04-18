import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';

import { UsersService } from '@shared/auth/services';
import { UiModule } from '@shared/ui/ui.module';
import { DashboardEditModalComponent } from '@shared/dashboards/components';
import { DashboardsModule } from '@shared/dashboards/dashboards.module';
import { ThemeService } from '@shared/themes/services';

@Component({
  selector: 'tp-home-page',
  templateUrl: './home-page.component.html',
  imports: [
    CommonModule,
    UiModule,
    DashboardsModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent implements OnInit {
  private dialogService = inject(Dialog);
  private usersService = inject(UsersService);
  private themeService = inject(ThemeService);

  user$ = this.usersService.user$;
  isSidebarOpen = false;

  ngOnInit(): void {
    this.themeService.resetTheme();
  }

  logOut(): void {
    this.usersService.logOut();
  }

  openDashboardCreation(): void {
    this.dialogService.open(DashboardEditModalComponent);
  }
}
