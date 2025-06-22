import { Pipe, PipeTransform } from '@angular/core';
import { Moment } from 'moment';

@Pipe({
  name: 'getFormattedMonth',
  standalone: false,
})
export class GetFormattedMonthPipe implements PipeTransform {
  transform(date: Moment): string {
    return date.format('MMMM YYYY');
  }
}
