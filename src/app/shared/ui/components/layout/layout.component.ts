import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';

import { UsersService } from '@shared/auth/services';
import { DashboardsPageDirective } from '@shared/dashboards/directives';
import { Dashboard } from '@shared/dashboards/models';
import { ThemeService } from '@shared/themes/services';

@UntilDestroy()
@Component({
  selector: 'tp-layout',
  templateUrl: './layout.component.html',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent extends DashboardsPageDirective implements OnInit {
  private usersService = inject(UsersService);
  private themeService = inject(ThemeService);
  private router = inject(Router);

  user$ = this.usersService.user$;
  dashboards$ = this.dashboardsStore.dashboards$;
  currentDashboard$ = this.dashboardsStore.currentDashboard$;
  isSidebarOpen = false;

  ngOnInit(): void {
    this.themeService.resetTheme();

    this.dashboardsStore.getDashboards();
  }

  logOut(): void {
    this.usersService.logOut();
  }

  changeDashboard(dashboard: Dashboard): void {
    this.dashboardsStore.setCurrentDashboard(dashboard);
    this.router.navigate(['/dashboard', dashboard.id]);
  }
}
