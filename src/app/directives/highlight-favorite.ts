import { Directive, input, ElementRef, effect, inject } from '@angular/core';

@Directive({
  selector: '[appHighlightFavorite]',
})
export class HighlightFavorite {
  appHighlightFavorite = input.required<boolean>();
  private el = inject<ElementRef<HTMLElement>>(ElementRef);

  constructor() {
    effect(() => {
      if (this.appHighlightFavorite()) {
        this.el.nativeElement.style.outline = '2px solid gold';
      } else {
        this.el.nativeElement.style.outline = 'none';
      }
    });
  }
}
