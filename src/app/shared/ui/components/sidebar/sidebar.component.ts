import { 
  AfterViewInit, 
  ChangeDetectionStrategy, 
  Component, 
  ElementRef, 
  EventEmitter, 
  inject, 
  Input, 
  Output, 
  ViewChild,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Dashboard } from '@shared/dashboards/models';
import { ThemeColors } from '@shared/themes/models';
import { ThemeService } from '@shared/themes/services';

@Component({
  selector: 'tp-sidebar',
  standalone: false,
  templateUrl: './sidebar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent implements AfterViewInit {
  @Input() currentDashboard: Dashboard | null = null;
  @Input() dashboards: Dashboard[] = [];
  @Output() closeSidebar = new EventEmitter<void>();
  @Output() logOut = new EventEmitter<void>();
  @Output() changeDashboard = new EventEmitter<Dashboard>();
  @Output() createDashboard = new EventEmitter<void>();
  @Output() deleteDashboard = new EventEmitter<Dashboard>();
  @Output() editDashboard = new EventEmitter<Dashboard>();

  @ViewChild('asideRef') asideRef!: ElementRef;

  private themeService = inject(ThemeService);

  currentTheme$ = this.themeService.currentTheme$;
  ThemeColors = ThemeColors;
  isScrollable$ = new BehaviorSubject<boolean>(false);

  ngAfterViewInit(): void {
    const el = this.asideRef.nativeElement;

    new ResizeObserver(() => this.checkElementScroll(el)).observe(el);
  }

  checkElementScroll(el: HTMLElement): void {
    this.isScrollable$.next(el.scrollHeight > el.clientHeight);
  }
}
