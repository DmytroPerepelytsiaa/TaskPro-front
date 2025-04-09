import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';

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

  private themeService = inject(ThemeService);

  currentTheme$ = this.themeService.currentTheme$;
  isThemesOpen = false;
  themeColors = Object.values(ThemeColors);

  setTheme(theme: ThemeColors) {
    this.themeService.setTheme(theme);
  }
}
