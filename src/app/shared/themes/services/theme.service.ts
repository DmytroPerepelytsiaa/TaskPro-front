import { Injectable } from '@angular/core';
import { BehaviorSubject, pairwise, tap } from 'rxjs';

import { ThemeColors } from '../models';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  currentTheme$ = new BehaviorSubject<ThemeColors>(ThemeColors.Dark);

  constructor() {
    this.currentTheme$
      .pipe(
        pairwise(),
        tap(([prev, curr]) => {
          document.body.classList.remove(prev + '-theme');
          document.body.classList.add(curr + '-theme');
        }),
      )
      .subscribe();

    const theme = localStorage.getItem('theme') as ThemeColors;

    if (Object.values(ThemeColors).includes(theme)) {
      this.currentTheme$.next(theme);
    } else {
      this.currentTheme$.next(ThemeColors.Dark);
    }
  }

  setTheme(theme: ThemeColors) {
    this.currentTheme$.next(theme);
    localStorage.setItem('theme', theme);
  }
}
