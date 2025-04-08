import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';

@Component({
  /* eslint-disable @angular-eslint/component-selector */
  selector: 'button[tp-button]',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  // TODO: add enum for button types
  @Input() appearance: 'primary' | 'secondary' | 'transparent' = 'primary';

  @HostBinding('class') private get baseClassNames() {
    return `btn btn-${this.appearance}`;
  }
}
