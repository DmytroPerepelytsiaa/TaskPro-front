import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Moment } from 'moment';

import { DAYS } from '@shared/ui/constants';

@Component({
  selector: 'tp-datepicker',
  standalone: false,
  templateUrl: './datepicker.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatepickerComponent implements OnInit {
  @Input() control!: FormControl;

  selectedDate!: Moment;
  currentMonth!: Moment;
  currentMonthDays!: Moment[];
  days = DAYS;

  ngOnInit(): void {
    this.selectedDate = this.control.value;
    this.currentMonth = this.selectedDate.clone();
    this.generateDaysInCurrentMonth();
  }

  changeToNextMonth(): void {
    this.currentMonth = this.currentMonth.clone().add(1, 'month');
    this.generateDaysInCurrentMonth();
  }

  changeToPrevMonth(): void {
    this.currentMonth = this.currentMonth.clone().subtract(1, 'month');
    this.generateDaysInCurrentMonth();
  }

  selectDate(date: Moment): void {
    this.control.patchValue(date);
    this.selectedDate = date;
  }

  private generateDaysInCurrentMonth(): void {
    this.currentMonthDays = [];
    const startOfMonth = this.currentMonth.clone().startOf('month');
    const endOfMonth = this.currentMonth.clone().endOf('month');

    const days: Moment[] = [];
    let day = startOfMonth;

    const dayOfWeek = startOfMonth.day();
    const daysToAddFromPrevMonth = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

    for (let i = daysToAddFromPrevMonth; i > 0; i--) {
      days.push(startOfMonth.clone().subtract(i, 'days'));
    } while (day <= endOfMonth && days.length !== 35) {
      days.push(day.clone());
      day = day.add(1, 'day');
    }

    this.currentMonthDays = days;
  }
}
