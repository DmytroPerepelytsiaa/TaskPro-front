import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';

import { ButtonAppearance } from '@shared/ui/models';

@Component({
  /* eslint-disable @angular-eslint/component-selector */
  selector: 'button[tp-button]',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  @Input() appearance = ButtonAppearance.Primary;

  @HostBinding('class') private get baseClassNames(): string {
    return `btn btn-${this.appearance}`;
  }
}
