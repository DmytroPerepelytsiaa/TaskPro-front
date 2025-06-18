import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';

import { 
  ButtonComponent, 
  HeaderComponent, 
  IconComponent, 
  InputComponent, 
  SidebarComponent, 
  TextareaComponent
} from './components';

@NgModule({
  declarations: [
    IconComponent,
    ButtonComponent,
    InputComponent,
    TextareaComponent,
    HeaderComponent,
    SidebarComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    OverlayModule,
  ],
  exports: [
    IconComponent,
    ButtonComponent,
    InputComponent,
    TextareaComponent,
    HeaderComponent,
    SidebarComponent,
  ],
})
export class UiModule {}
