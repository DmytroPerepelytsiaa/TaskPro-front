import {
  AfterViewInit,
  Directive,
  ElementRef,
  inject,
} from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';

@Directive({
  selector: '[matTooltip][tpTooltip]',
  standalone: false,
})
export class TooltipDirective implements AfterViewInit {
  private elRef = inject(ElementRef);
  private tooltip = inject(MatTooltip);

  ngAfterViewInit(): void {
    // TODO: delete after destroy
    new MutationObserver(() => this.checkTruncation())
      .observe(this.elRef.nativeElement, {
        characterData: true,
        childList: true,
        subtree: true,
      });

    this.checkTruncation();
  }

  private checkTruncation(): void {
    const el = this.elRef.nativeElement;
    const isTruncated = el.offsetWidth !== el.scrollWidth;

    this.tooltip.disabled = !isTruncated;
  }
}
