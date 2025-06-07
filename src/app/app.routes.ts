import { Routes } from '@angular/router';

import { privateGuard, publicGuard } from '@shared/auth/guards';

export const routes: Routes = [
  { path: 'welcome', loadComponent: () => import('@pages/welcome/welcome-page.component').then(m => m.WelcomePageComponent), canActivate: [publicGuard] },
  { path: 'auth/login', loadComponent: () => import('@pages/auth/auth-page.component').then(m => m.AuthPageComponent), canActivate: [publicGuard] },
  { path: 'auth/registration', loadComponent: () => import('@pages/auth/auth-page.component').then(m => m.AuthPageComponent), canActivate: [publicGuard] },
  { path: 'home', loadComponent: () => import('@pages/home/home-page.component').then(m => m.HomePageComponent), canActivate: [privateGuard] },
  { path: 'dashboard/:id', loadComponent: () => import('@pages/dashboard/dashboard-page.component').then(m => m.DashboardPageComponent), canActivate: [privateGuard] },
  { redirectTo: 'welcome', path: '**' },
];
