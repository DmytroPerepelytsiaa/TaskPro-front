import { NgModule } from '@angular/core';

import { GetDayFromMomentDatePipe, GetFormattedDatePipe, GetFormattedMonthPipe, IsSelectedDate } from './pipes';

@NgModule({
  declarations: [
    GetFormattedDatePipe,
    GetFormattedMonthPipe,
    GetDayFromMomentDatePipe,
    IsSelectedDate,
  ],
  imports: [],
  exports: [
    GetFormattedDatePipe,
    GetFormattedMonthPipe,
    GetDayFromMomentDatePipe,
    IsSelectedDate,
  ],
})
export class DatesModule {}
