import { DIALOG_DATA } from '@angular/cdk/dialog';
import { ChangeDetectionStrategy, Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
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
  @Output() createCard = new EventEmitter<DashboardCardFormState>();
  @Output() editCard = new EventEmitter<DashboardColumnCard>();

  private formBuilder = inject(FormBuilder);
  
  dialogData = inject<{ card?: DashboardColumnCard }>(DIALOG_DATA);
  
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
    if (this.dialogData.card) {
      this.dashboardCardForm.patchValue({
        name: this.dialogData.card.name,
        description: this.dialogData.card.description,
        priority: this.dialogData.card.priority,
        deadline: moment(this.dialogData.card.deadline),
      });
    }
  }

  handleSubmit(): void {
    const value = this.dashboardCardForm.getRawValue();

    this.dialogData.card ? this.editCard.emit({ ...this.dialogData.card, ...value, deadline: value.deadline.format('YYYY-MM-DD') }) : this.createCard.emit(value);
  }
}
