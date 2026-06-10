import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { TrackList } from './track-list';

describe('TrackList', () => {
  let component: TrackList;
  let fixture: ComponentFixture<TrackList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrackList],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(TrackList);
    fixture.componentRef.setInput('tracks', []);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
