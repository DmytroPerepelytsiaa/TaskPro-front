import {
  Directive,
  ElementRef,
  HostListener,
  inject,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

import { Dashboard, DashboardBackgrounds } from '@shared/dashboards/models';

// TODO: maybe change to snake case?
@Directive({
  selector: '[tpDashboardBackground]',
  standalone: false,
})
export class DashboardBackgroundDirective implements OnChanges {
  @Input() currentDashboard: Dashboard | null = null;

  private el = inject(ElementRef);

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.setBackgroundImage();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['currentDashboard']) {
      this.setBackgroundImage();
    }
  }

  private setBackgroundImage(): void {
    if (this.currentDashboard) {
      if (this.currentDashboard.background === DashboardBackgrounds.NoBg) {
        this.el.nativeElement.style.backgroundImage = 'none';
      } else if (window.innerWidth >= 1440) {
        this.el.nativeElement.style.backgroundImage = this.getDashboardStyle(this.currentDashboard.background + '-desktop', window.devicePixelRatio);
      } else if (window.innerWidth >= 768 && window.innerWidth < 1440) {
        this.el.nativeElement.style.backgroundImage = this.getDashboardStyle(this.currentDashboard.background + '-tablet', window.devicePixelRatio);
      } else if (window.innerWidth < 768) {
        this.el.nativeElement.style.backgroundImage = this.getDashboardStyle(this.currentDashboard.background, window.devicePixelRatio);
      }
    } else {
      this.el.nativeElement.style.backgroundImage = 'none';
    }
  }

  private getDashboardStyle(imageName: string, pixelRation: number): string {
    if (pixelRation >= 2) {
      imageName += '@2x';
    }

    return `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('./dashboard-bg/${imageName}.png')`;
  }
}
