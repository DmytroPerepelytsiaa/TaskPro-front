import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  inject,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'tp-icon',
  standalone: false,
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent implements OnChanges {
  @Input() svgIcon!: string;
  @Input() color!: string;
  @Input() invertColor!: boolean;
  @Input() size = '24';

  @HostBinding('class.align-middle') alignMiddle = true;

  private iconRegistry = inject(MatIconRegistry);
  private sanitizer = inject(DomSanitizer);

  ngOnChanges(changes: SimpleChanges): void {
    const isSvgIconInRegistry = this.iconRegistry['_svgIconConfigs'].has(':' + this.svgIcon);

    if (changes['svgIcon'] && !isSvgIconInRegistry) {
      this.iconRegistry.addSvgIcon(
        this.svgIcon,
        this.sanitizer.bypassSecurityTrustResourceUrl(`/icons/${this.svgIcon}.svg`),
      );
    }
  }
}
