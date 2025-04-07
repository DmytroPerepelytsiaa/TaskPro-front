import { Routes } from '@angular/router';

import { AuthPageComponent } from '@pages/auth/auth-page.component';
import { WelcomePageComponent } from '@pages/welcome/welcome-page.component';
import { publicGuard } from '@shared/auth/guards';

export const routes: Routes = [
  { path: 'welcome', component: WelcomePageComponent, canActivate: [publicGuard] },
  { path: 'auth/login', component: AuthPageComponent, canActivate: [publicGuard] },
  { path: 'auth/registration', component: AuthPageComponent, canActivate: [publicGuard] },
  { redirectTo: 'welcome', path: '**' },
];
