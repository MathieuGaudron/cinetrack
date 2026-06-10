import { Component, input, output, signal } from '@angular/core';
import { TrackCard } from '../track-card/track-card';
import { Track } from '../models/track';

@Component({
  selector: 'app-track-list',
  imports: [TrackCard],
  templateUrl: './track-list.html',
  styleUrl: './track-list.css',
})
export class TrackList {
  tracks = input.required<Track[]>();
  searchTerm = input('');
  canDelete = input(false);
  remove = output<number>();
  protected selectedId = signal<number | null>(null);
}
