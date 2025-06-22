import { Pipe, PipeTransform } from '@angular/core';
import { Moment } from 'moment';

@Pipe({
  name: 'getDayFromDate',
  standalone: false,
})
export class GetDayFromMomentDatePipe implements PipeTransform {
  transform(date: Moment): number {
    return date.get('D');
  }
}
