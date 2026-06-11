import { Component, computed, inject, linkedSignal, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  map,
  of,
  startWith,
  switchMap,
} from 'rxjs';
import { RouterLink } from '@angular/router';
import { TrackList } from '../track-list/track-list';
import { TrackService } from '../services/track.service';
import { AuthService } from '../services/auth.service';
import { FeaturesService } from '../services/features.service';
import { Track } from '../models/track';

type ListState =
  | { status: 'loading' }
  | { status: 'error' }
  | { status: 'done'; tracks: Track[] };

@Component({
  selector: 'app-home',
  imports: [TrackList, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  private trackService = inject(TrackService);
  protected auth = inject(AuthService);
  protected features = inject(FeaturesService);
  protected term = signal('');

  // Recherche côté serveur : un terme vide renvoie toute la liste.
  private state = toSignal(
    toObservable(this.term).pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((q) =>
        this.trackService.search(q).pipe(
          map((tracks): ListState => ({ status: 'done', tracks })),
          startWith<ListState>({ status: 'loading' }),
          catchError(() => of<ListState>({ status: 'error' })),
        ),
      ),
    ),
    { initialValue: { status: 'loading' } satisfies ListState },
  );

  protected loading = computed(() => this.state().status === 'loading');
  protected error = computed(() => this.state().status === 'error');

  private serverTracks = computed(() => {
    const state = this.state();
    if (state.status === 'done') {
      return state.tracks;
    } else {
      return [];
    }
  });

  protected tracks = linkedSignal(() => this.serverTracks());

  protected removeTrack(id: number) {
    this.trackService.remove(id).subscribe(() => {
      this.tracks.update((tracks) => tracks.filter((t) => t.id !== id));
    });
  }

  protected toggleFavorite(track: Track) {
    if (track.favorite) {
      this.trackService.removeFavorite(track.id).subscribe((updated) => {
        this.applyFavorite(updated);
      });
    } else {
      this.trackService.addFavorite(track.id).subscribe((updated) => {
        this.applyFavorite(updated);
      });
    }
  }

  private applyFavorite(updated: Track) {
    this.tracks.update((tracks) =>
      tracks.map((t) => {
        if (t.id === updated.id) {
          return updated;
        } else {
          return t;
        }
      }),
    );
  }
}
