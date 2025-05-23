import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';

import { UsersService } from '@shared/auth/services';
import { DashboardsStoreService } from '@shared/dashboards/services';
import { ThemeService } from '@shared/themes/services';

@UntilDestroy()
@Component({
  selector: 'tp-layout',
  templateUrl: './layout.component.html',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent implements OnInit {
  private usersService = inject(UsersService);
  private themeService = inject(ThemeService);
  private dashboardsStore = inject(DashboardsStoreService);

  user$ = this.usersService.user$;
  dashboards$ = this.dashboardsStore.dashboards$;
  isSidebarOpen = false;

  ngOnInit(): void {
    this.themeService.resetTheme();

    this.dashboardsStore.getDashboards$();
  }

  logOut(): void {
    this.usersService.logOut();
  }
}
