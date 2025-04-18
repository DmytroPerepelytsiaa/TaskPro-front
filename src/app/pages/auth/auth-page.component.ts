import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { switchMap, tap } from 'rxjs';

import { AuthResponse } from '@shared/auth/models';
import { UsersService } from '@shared/auth/services';
import { trimValidator } from '@shared/validators';
import { UiModule } from '@shared/ui/ui.module';
import { InputType } from '@shared/ui/models';

import { emailValidator, passwordValidator } from './validators';
import { AuthForm } from './models';

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
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  usersService = inject(UsersService);
  formBuilder = inject(FormBuilder);
  authForm: FormGroup<AuthForm> = this.formBuilder.group<AuthForm>({
    name: this.formBuilder.nonNullable.control('', [trimValidator(2, 36)]),
    email: this.formBuilder.nonNullable.control('', [emailValidator(0, 256)]),
    password: this.formBuilder.nonNullable.control('', [passwordValidator(8, 36)]),
  });
  isRegistrationPage = false;
  InputType = InputType;

  ngOnInit(): void {
    document.body.className = '';
    document.body.classList.add('dark-theme');
    
    this.activatedRoute.url
      .pipe(
        tap((params) => {
          this.isRegistrationPage = params[1].path === 'registration';
        }),
        untilDestroyed(this),
      )
      .subscribe();
  }

  // TODO: add error handling
  onSubmit(): void {
    const payload = this.authForm.getRawValue();
    const authObservable$ = this.isRegistrationPage ? this.usersService.register$(payload) : this.usersService.login$(payload);

    authObservable$ 
      .pipe(
        tap((data: AuthResponse) => this.usersService.setToken(data.token)),
        switchMap(() => this.usersService.getCurrentUser$()),
        tap(() => this.router.navigate(['/dashboard'])),
        untilDestroyed(this),
      )
      .subscribe();
  }
}
