import { Directive, input, ElementRef, effect, inject } from '@angular/core';

@Directive({
  selector: '[appHighlightFavorite]',
})
export class HighlightFavorite {
  appHighlightFavorite = input.required<boolean>();
  private el = inject<ElementRef<HTMLElement>>(ElementRef);

  constructor() {
    effect(() => {
      this.el.nativeElement.classList.toggle(
        'is-favorite',
        this.appHighlightFavorite(),
      );
    });
  }
}
