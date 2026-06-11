import { Component, inject, signal } from '@angular/core';
import { TrackList } from '../track-list/track-list';
import { TrackService } from '../services/track.service';
import { Track } from '../models/track';

@Component({
  selector: 'app-favorites',
  imports: [TrackList],
  templateUrl: './favorites.html',
  styleUrl: './favorites.css',
})
export class Favorites {
  private trackService = inject(TrackService);

  protected loading = signal(true);
  protected error = signal(false);
  protected tracks = signal<Track[]>([]);

  constructor() {
    this.trackService.getFavorites().subscribe({
      next: (tracks) => {
        this.tracks.set(tracks);
        this.loading.set(false);
      },
      error: () => {
        this.error.set(true);
        this.loading.set(false);
      },
    });
  }

  protected removeFavorite(track: Track) {
    this.trackService.removeFavorite(track.id).subscribe((updated) => {
      this.tracks.update((list) => list.filter((t) => t.id !== updated.id));
    });
  }
}
