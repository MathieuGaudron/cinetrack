import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { TrackCard } from './track-card';
import { Track } from '../models/track';

const track: Track = {
  id: 1,
  title: 'Test',
  artist: 'Tester',
  album: 'Album',
  genre: 'Rock',
  durationSeconds: 200,
  year: 2020,
  rating: 8,
  favorite: false,
  coverUrl: '',
};

describe('TrackCard', () => {
  let component: TrackCard;
  let fixture: ComponentFixture<TrackCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrackCard],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(TrackCard);
    fixture.componentRef.setInput('track', track);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
