import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Track } from '../models/track';
import { DurationFormatPipe } from '../pipes/duration-format-pipe';
import { HighlightFavorite } from '../directives/highlight-favorite';

@Component({
  selector: 'app-track-card',
  imports: [RouterLink, DurationFormatPipe, HighlightFavorite],
  templateUrl: './track-card.html',
  styleUrl: './track-card.css',
})
export class TrackCard {
  track = input.required<Track>();
  active = input(false);
  canDelete = input(false);
  select = output<Track>();
  remove = output<number>();
}
