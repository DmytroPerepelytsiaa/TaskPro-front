import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';

import { UserService } from '@shared/auth/services';
import { DashboardsPageDirective } from '@shared/dashboards/directives';
import { Dashboard } from '@shared/dashboards/models';
import { ThemeService } from '@shared/themes/services';
import { UiModule } from '@shared/ui/ui.module';

@UntilDestroy()
@Component({
  selector: 'tp-layout',
  templateUrl: './layout.component.html',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    UiModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent extends DashboardsPageDirective implements OnInit {
  private userService = inject(UserService);
  private themeService = inject(ThemeService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  user$ = this.userService.user$;
  dashboards$ = this.dashboardStore.dashboards$;
  currentDashboard$ = this.dashboardStore.currentDashboard$;
  isSidebarOpen = false;

  ngOnInit(): void {
    this.themeService.resetTheme();

    const id = this.route.snapshot.paramMap.get('id');
    this.dashboardStore.getDashboards(Number(id));
  }

  logOut(): void {
    this.userService.logOut();
  }

  changeDashboard(dashboard: Dashboard): void {
    this.dashboardStore.setCurrentDashboard(dashboard);
    this.router.navigate(['/dashboard', dashboard.id]);
  }

  deleteDashboard(dashboard: Dashboard): void {
    this.dashboardStore.deleteDashboard(dashboard);
  }
}
