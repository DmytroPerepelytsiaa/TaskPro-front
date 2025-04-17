import { ChangeDetectionStrategy, Component, EventEmitter, inject, Output } from '@angular/core';

import { ThemeColors } from '@shared/themes/models';
import { ThemeService } from '@shared/themes/services';

@Component({
  selector: 'tp-sidebar',
  standalone: false,
  templateUrl: './sidebar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  @Output() closeSidebar = new EventEmitter<void>();
  @Output() logOut = new EventEmitter<void>();

  private themeService = inject(ThemeService);

  currentTheme$ = this.themeService.currentTheme$;

  ThemeColors = ThemeColors;
}
