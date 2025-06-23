import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'tp-textarea',
  standalone: false,
  templateUrl: './textarea.component.html',
})
export class TextareaComponent {
  @Input() control!: FormControl;
  @Input() placeholder = '';
  @Input() class!: string;
}
