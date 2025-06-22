import { Pipe, PipeTransform } from '@angular/core';
import { Moment } from 'moment';

@Pipe({
  name: 'isSelectedDate',
  standalone: false,
})
export class IsSelectedDate implements PipeTransform {
  transform(date: Moment, compare: Moment): boolean {
    return date.isSame(compare, 'day');
  }
}
