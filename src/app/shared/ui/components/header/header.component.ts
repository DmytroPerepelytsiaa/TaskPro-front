import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

@Component({
  selector: 'tp-header',
  standalone: false,
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  @Input() username = '';
}
