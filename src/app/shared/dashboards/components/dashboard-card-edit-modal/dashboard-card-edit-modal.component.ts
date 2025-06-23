import { DIALOG_DATA } from '@angular/cdk/dialog';
import { ChangeDetectionStrategy, Component, EventEmitter, inject, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import moment, { Moment } from 'moment';

import { CardPriority, DashboardCardForm, DashboardCardFormState, DashboardColumnCard } from '@shared/dashboards/models';
import { trimValidator } from '@shared/validators';

@Component({
  selector: 'tp-dashboard-card-edit-modal',
  standalone: false,
  templateUrl: './dashboard-card-edit-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardCardEditModalComponent implements OnInit {
  constructor(@Inject(DIALOG_DATA) public data: { card: DashboardColumnCard }) {}

  @Output() createCard = new EventEmitter<DashboardCardFormState>();
  @Output() editCard = new EventEmitter<DashboardColumnCard>();

  private formBuilder = inject(FormBuilder);
  
  dashboardCardForm: FormGroup<DashboardCardForm> = this.formBuilder.group<DashboardCardForm>({
    name: this.formBuilder.nonNullable.control('', [trimValidator(6, 64)]),
    description: this.formBuilder.nonNullable.control('', [trimValidator(0, 180)]),
    priority: this.formBuilder.nonNullable.control(CardPriority.Low),
    deadline: this.formBuilder.nonNullable.control(moment()),
  });
  cardPriorityValues = Object.values(CardPriority);
  CardPriority = CardPriority;
  isDatePickerOpen = false;

  // TODO: try to fix this
  get deadline(): Moment {
    return this.dashboardCardForm.value.deadline as Moment;
  }

  ngOnInit(): void {
    if (this.data.card) {
      this.dashboardCardForm.patchValue({
        name: this.data.card.name,
        description: this.data.card.description,
        priority: this.data.card.priority,
        deadline: moment(this.data.card.deadline),
      });
    }
  }

  handleSubmit(): void {
    const value = this.dashboardCardForm.getRawValue();

    this.data.card ? this.editCard.emit({ ...this.data.card, ...value, deadline: value.deadline.format('YYYY-MM-DD') }) : this.createCard.emit(value);
  }
}
