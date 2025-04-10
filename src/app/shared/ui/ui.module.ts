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
  SidebarComponent 
} from './components';

@NgModule({
  declarations: [
    IconComponent,
    ButtonComponent,
    InputComponent,
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
    HeaderComponent,
    SidebarComponent,
  ],
})
export class UiModule {}
