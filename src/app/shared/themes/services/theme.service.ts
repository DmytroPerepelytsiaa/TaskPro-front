import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { ThemeColors } from '../models';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  currentTheme$ = new BehaviorSubject<ThemeColors>(ThemeColors.Dark);

  constructor() {
    const theme = localStorage.getItem('theme') as ThemeColors;

    if (Object.values(ThemeColors).includes(theme)) {
      this.currentTheme$.next(theme);
    }
  }

  setTheme(theme: ThemeColors) {
    this.currentTheme$.next(theme);
    localStorage.setItem('theme', theme);
  }
}
