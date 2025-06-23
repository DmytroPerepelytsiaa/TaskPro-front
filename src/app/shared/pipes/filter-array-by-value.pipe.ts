import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterArrayByValue',
  standalone: true
})
export class FilterArrayPipe implements PipeTransform {
  transform<T>(array: T[], key: keyof T, value: unknown): T[] {
    if (!value) {
      return array;
    }

    return array.filter(item => item[key] === value);
  }
}
