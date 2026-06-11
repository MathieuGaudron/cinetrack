import { Component, computed, inject, input } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Router, RouterLink } from '@angular/router';
import { catchError, map, of, startWith, switchMap } from 'rxjs';
import { Track } from '../models/track';
import { TrackService } from '../services/track.service';
import { AuthService } from '../services/auth.service';
import { DurationFormatPipe } from '../pipes/duration-format-pipe';

type DetailState =
  | { status: 'loading' }
  | { status: 'error' }
  | { status: 'loaded'; track: Track };

@Component({
  selector: 'app-track-detail',
  imports: [RouterLink, DurationFormatPipe],
  templateUrl: './track-detail.html',
  styleUrl: './track-detail.css',
})
export class TrackDetail {
  trackId = input.required<number>();
  private service = inject(TrackService);
  private router = inject(Router);
  protected auth = inject(AuthService);

  private state = toSignal(
    toObservable(this.trackId).pipe(
      switchMap((id) =>
        this.service.getTrack(id).pipe(
          map((track): DetailState => ({ status: 'loaded', track })),
          startWith<DetailState>({ status: 'loading' }),
          catchError(() => of<DetailState>({ status: 'error' })),
        ),
      ),
    ),
    { initialValue: { status: 'loading' } satisfies DetailState },
  );

  protected loading = computed(() => this.state().status === 'loading');
  protected error = computed(() => this.state().status === 'error');

  protected track = computed(() => {
    const state = this.state();
    if (state.status === 'loaded') {
      return state.track;
    } else {
      return undefined;
    }
  });

  protected removeTrack(id: number) {
    this.service.remove(id).subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}
