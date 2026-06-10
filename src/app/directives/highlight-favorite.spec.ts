import { TestBed } from '@angular/core/testing';
import { ElementRef } from '@angular/core';
import { HighlightFavorite } from './highlight-favorite';

describe('HighlightFavorite', () => {
  it('should create an instance', () => {
    TestBed.configureTestingModule({
      providers: [{ provide: ElementRef, useValue: new ElementRef(document.createElement('div')) }],
    });
    const directive = TestBed.runInInjectionContext(() => new HighlightFavorite());
    expect(directive).toBeTruthy();
  });
});
