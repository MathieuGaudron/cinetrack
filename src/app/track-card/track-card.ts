import { Component, inject, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Track } from '../models/track';
import { DurationFormatPipe } from '../pipes/duration-format-pipe';
import { HighlightFavorite } from '../directives/highlight-favorite';
import { FeaturesService } from '../services/features.service';

@Component({
  selector: 'app-track-card',
  imports: [RouterLink, DurationFormatPipe, HighlightFavorite],
  templateUrl: './track-card.html',
  styleUrl: './track-card.css',
})
export class TrackCard {
  protected features = inject(FeaturesService);
  track = input.required<Track>();
  active = input(false);
  canDelete = input(false);
  canFavorite = input(false);
  select = output<Track>();
  remove = output<number>();
  toggleFavorite = output<Track>();
}
