import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatTooltipModule } from '@angular/material/tooltip';

import { DatesModule } from '@shared/dates/dates.module';

import { 
  ButtonComponent, 
  DatepickerComponent, 
  HeaderComponent, 
  IconComponent, 
  InputComponent, 
  SidebarComponent, 
  TextareaComponent
} from './components';
import { TooltipDirective } from './directives';

@NgModule({
  declarations: [
    IconComponent,
    ButtonComponent,
    InputComponent,
    TextareaComponent,
    HeaderComponent,
    SidebarComponent,
    DatepickerComponent,
    TooltipDirective,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatTooltipModule,
    OverlayModule,
    DatesModule,
  ],
  exports: [
    IconComponent,
    ButtonComponent,
    InputComponent,
    TextareaComponent,
    HeaderComponent,
    SidebarComponent,
    DatepickerComponent,
    TooltipDirective,
  ],
})
export class UiModule {}
