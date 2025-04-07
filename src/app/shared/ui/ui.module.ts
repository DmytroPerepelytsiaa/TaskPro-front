import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ButtonComponent, IconComponent, InputComponent } from './components';

@NgModule({
  declarations: [
    IconComponent,
    ButtonComponent,
    InputComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
  ],
  exports: [
    IconComponent,
    ButtonComponent,
    InputComponent,
  ],
})
export class UiModule {}
