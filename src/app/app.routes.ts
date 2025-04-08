import { Routes } from '@angular/router';

import { AuthPageComponent } from '@pages/auth/auth-page.component';
import { HomePageComponent } from '@pages/home/home-page.component';
import { WelcomePageComponent } from '@pages/welcome/welcome-page.component';
import { privateGuard, publicGuard } from '@shared/auth/guards';

export const routes: Routes = [
  { path: 'welcome', component: WelcomePageComponent, canActivate: [publicGuard] },
  { path: 'auth/login', component: AuthPageComponent, canActivate: [publicGuard] },
  { path: 'auth/registration', component: AuthPageComponent, canActivate: [publicGuard] },
  { path: 'home', component: HomePageComponent, canActivate: [privateGuard] },
  { redirectTo: 'welcome', path: '**' },
];
