import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ButtonComponent, HeaderComponent, IconComponent, InputComponent } from './components';

@NgModule({
  declarations: [
    IconComponent,
    ButtonComponent,
    InputComponent,
    HeaderComponent,
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
    HeaderComponent,
  ],
})
export class UiModule {}
