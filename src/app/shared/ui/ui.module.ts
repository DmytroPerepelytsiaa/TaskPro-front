import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { IconComponent } from './components';

@NgModule({
  declarations: [IconComponent],
  imports: [MatIconModule],
  exports: [IconComponent],
})
export class UiModule {}
