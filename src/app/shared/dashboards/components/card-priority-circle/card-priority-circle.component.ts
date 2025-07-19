import { Component, Input } from '@angular/core';

import { CardPriority } from '@shared/dashboards/models';

@Component({
  selector: 'tp-card-priority-circle',
  templateUrl: './card-priority-circle.component.html',
  standalone: false,
})
export class CardPriorityCircleComponent {
  @Input() priority: CardPriority = CardPriority.Low;
  @Input() isActive = false;

  CardPriority = CardPriority;
}
