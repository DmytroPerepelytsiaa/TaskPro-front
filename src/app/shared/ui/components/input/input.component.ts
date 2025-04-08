import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

import { InputType } from '@shared/ui/models';

@Component({
  selector: 'tp-input',
  standalone: false,
  templateUrl: './input.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent {
  @Input() control!: FormControl;
  @Input() type: InputType = InputType.Text;
  @Input() placeholder!: string;
  
  hidePassword = true;
  InputType = InputType;
}
