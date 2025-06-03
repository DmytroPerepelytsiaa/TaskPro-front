import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output } from '@angular/core';

import { Dashboard } from '@shared/dashboards/models';
import { ThemeColors } from '@shared/themes/models';
import { ThemeService } from '@shared/themes/services';

@Component({
  selector: 'tp-sidebar',
  standalone: false,
  templateUrl: './sidebar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  @Input() currentDashboard: Dashboard | null = null;
  @Input() dashboards: Dashboard[] = [];
  @Output() closeSidebar = new EventEmitter<void>();
  @Output() logOut = new EventEmitter<void>();
  @Output() changeDashboard = new EventEmitter<Dashboard>();
  @Output() createDashboard = new EventEmitter<void>();

  private themeService = inject(ThemeService);

  currentTheme$ = this.themeService.currentTheme$;

  ThemeColors = ThemeColors;
}
