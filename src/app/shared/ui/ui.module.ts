import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { ButtonComponent, IconComponent } from './components';

@NgModule({
  declarations: [
    IconComponent,
    ButtonComponent,
  ],
  imports: [MatIconModule],
  exports: [
    IconComponent,
    ButtonComponent,
  ],
})
export class UiModule {}
