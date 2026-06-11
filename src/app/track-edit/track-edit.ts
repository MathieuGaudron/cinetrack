import { Component, computed, inject, input } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Router, RouterLink } from '@angular/router';
import { catchError, map, of, startWith, switchMap } from 'rxjs';
import { Track } from '../models/track';
import { TrackService } from '../services/track.service';
import { TrackForm } from '../track-form/track-form';

type EditState =
  | { status: 'loading' }
  | { status: 'error' }
  | { status: 'loaded'; track: Track };

@Component({
  selector: 'app-track-edit',
  imports: [TrackForm, RouterLink],
  templateUrl: './track-edit.html',
})
export class TrackEdit {
  trackId = input.required<number>();
  private service = inject(TrackService);
  private router = inject(Router);

  private state = toSignal(
    toObservable(this.trackId).pipe(
      switchMap((id) =>
        this.service.getTrack(id).pipe(
          map((track): EditState => ({ status: 'loaded', track })),
          startWith<EditState>({ status: 'loading' }),
          catchError(() => of<EditState>({ status: 'error' })),
        ),
      ),
    ),
    { initialValue: { status: 'loading' } satisfies EditState },
  );

  protected loading = computed(() => this.state().status === 'loading');
  protected error = computed(() => this.state().status === 'error');

  protected track = computed(() => {
    const state = this.state();
    if (state.status === 'loaded') {
      return state.track;
    } else {
      return null;
    }
  });

  protected saveTrack(changes: Omit<Track, 'id'>) {
    this.service.update(this.trackId(), changes).subscribe(() => {
      this.router.navigate(['/tracks', this.trackId()]);
    });
  }
}
