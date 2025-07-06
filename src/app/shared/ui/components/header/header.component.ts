import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output } from '@angular/core';

import { ThemeColors } from '@shared/themes/models';
import { ThemeService } from '@shared/themes/services';

@Component({
  selector: 'tp-header',
  standalone: false,
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  @Input() username = '';
  @Output() openSidebar = new EventEmitter<void>();
  @Output() editProfile = new EventEmitter<void>();

  private themeService = inject(ThemeService);

  currentTheme$ = this.themeService.currentTheme$;
  isThemesOpen = false;
  themeColors = Object.values(ThemeColors);

  setTheme(theme: ThemeColors): void {
    this.themeService.setTheme(theme);
  }
}
