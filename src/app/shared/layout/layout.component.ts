import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { catchError, combineLatest, Observable, of, switchMap, tap } from 'rxjs';

import { ProfileEditModalComponent } from '@shared/auth/components';
import { EditProfileFormState } from '@shared/auth/models';
import { UserService } from '@shared/auth/services';
import { DashboardsModule } from '@shared/dashboards/dashboards.module';
import { DashboardsPageDirective } from '@shared/dashboards/directives';
import { Dashboard } from '@shared/dashboards/models';
import { CloudinaryService } from '@shared/cloudinary/services';
import { ThemeService } from '@shared/themes/services';
import { UiModule } from '@shared/ui/ui.module';
import { CloudinaryUploadResponse } from '@shared/cloudinary/models';
import { ConfirmationDialogComponent } from '@shared/ui/components';

@UntilDestroy()
@Component({
  selector: 'tp-layout',
  templateUrl: './layout.component.html',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    UiModule,
    DashboardsModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent extends DashboardsPageDirective implements OnInit {
  private cloudinaryService = inject(CloudinaryService);
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
    const modalRef = this.dialogService.open(ConfirmationDialogComponent, {
      data: { confirmationText: `Are you sure you want to delete <span class="text-red-1 truncate inline-block max-w-[120px] leading-4">${dashboard.name}</span> dashboard?` },
    });

    modalRef.componentInstance?.confirm
      .pipe(
        tap(() => {
          this.dashboardStore.deleteDashboard(dashboard);
          modalRef.close();
        }),
        untilDestroyed(this),
      )
      .subscribe();

    modalRef.componentInstance?.closeModal
      .pipe(
        tap(() => modalRef.close()),
        untilDestroyed(this),
      )
      .subscribe();
  }

  openProfileEditModal(): void {
    const modalRef = this.dialogService.open(ProfileEditModalComponent, { data: { user: this.user$.value } });

    modalRef.componentInstance?.saveData
      .pipe(
        switchMap((data: EditProfileFormState) => {
          const name$ = of(data.name);
          const upload$: Observable<CloudinaryUploadResponse | null> = data.avatarUrl
            ? this.cloudinaryService.uploadImage(data.avatarUrl)
            : of(null);

          return combineLatest([name$, upload$]);
        }),
        switchMap(([name, uploadResonse]) => {
          return this.userService.updateUserGeneralInfo$(name, uploadResonse?.secure_url ?? null);
        }),
        tap(() => modalRef.close()),
        catchError((error: HttpErrorResponse) => {
          const errorMessage = error.error?.message || error.message;

          if (errorMessage) {
            this.snackBar.open(errorMessage, 'Close', { panelClass: 'error-snackbar' });
          }
          
          return of(null);
        }),
        untilDestroyed(this),
      )
      .subscribe();
    
    modalRef.componentInstance?.closeModal
      .pipe(
        tap(() => modalRef.close()),
        untilDestroyed(this),
      )
      .subscribe();
  }
}
