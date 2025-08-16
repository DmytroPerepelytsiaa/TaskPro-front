import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, catchError, of, switchMap, tap } from 'rxjs';

import { AuthForm, AuthResponse } from '@shared/auth/models';
import { UserService } from '@shared/auth/services';
import { emailValidator, passwordValidator, trimValidator } from '@shared/validators';
import { UiModule } from '@shared/ui/ui.module';
import { ButtonAppearance, InputType } from '@shared/ui/models';

@UntilDestroy()
@Component({
  selector: 'tp-auth-page',
  standalone: true,
  imports: [
    RouterModule,
    ReactiveFormsModule,
    CommonModule,
    UiModule,
  ],
  templateUrl: './auth-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthPageComponent implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  private userService = inject(UserService);
  private formBuilder = inject(FormBuilder);
  private snackBar = inject(MatSnackBar);

  authForm: FormGroup<AuthForm> = this.formBuilder.group<AuthForm>({
    name: this.formBuilder.nonNullable.control('', [trimValidator(2, 36)]),
    email: this.formBuilder.nonNullable.control('', [emailValidator(0, 256)]),
    password: this.formBuilder.nonNullable.control('', [passwordValidator(8, 36)]),
  });
  isRegistrationPage$ = new BehaviorSubject(false);
  InputType = InputType;
  ButtonAppearance = ButtonAppearance;

  ngOnInit(): void {
    document.body.className = '';
    document.body.classList.add('dark-theme');
    
    this.activatedRoute.url
      .pipe(
        tap((params) => {
          this.isRegistrationPage$.next(params[1].path === 'registration');
        }),
        untilDestroyed(this),
      )
      .subscribe();

    this.isRegistrationPage$
      .pipe(
        tap((isRegistrationPage) => {
          if (isRegistrationPage) {
            this.authForm.controls.name.setValidators([trimValidator(2, 36)]);
            this.authForm.controls.email.setValidators([emailValidator(0, 256)]);
            this.authForm.controls.password.setValidators([passwordValidator(8, 36)]);
          } else {
            this.authForm.controls.name.clearValidators();
            this.authForm.controls.email.setValidators([trimValidator(0, 256)]);
            this.authForm.controls.password.setValidators([trimValidator(0, 256)]);
          }
        }),
        untilDestroyed(this),
      )
      .subscribe();
  }

  onSubmit(): void {
    const payload = this.authForm.getRawValue();
    const authObservable$ = this.isRegistrationPage$.value ? this.userService.register$(payload) : this.userService.login$(payload);

    authObservable$ 
      .pipe(
        tap((data: AuthResponse) => this.userService.setToken(data.token)),
        switchMap(() => this.userService.getCurrentUser$()),
        tap(() => this.router.navigate(['/dashboard'])),
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
  }
}
