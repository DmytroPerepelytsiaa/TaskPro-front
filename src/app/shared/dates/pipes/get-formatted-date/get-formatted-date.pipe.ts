import { Pipe, PipeTransform } from '@angular/core';
import { Moment } from 'moment';

@Pipe({
  name: 'getFormattedDate',
  standalone: false,
})
export class GetFormattedDatePipe implements PipeTransform {
  transform(date: Moment): string {
    return date.format('D MMMM YYYY');
  }
}
