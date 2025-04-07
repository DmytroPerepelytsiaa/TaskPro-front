import { Routes } from '@angular/router';

import { WelcomePageComponent } from '@pages/welcome/welcome-page.component';

export const routes: Routes = [
  { component: WelcomePageComponent, path: '**' },
];
