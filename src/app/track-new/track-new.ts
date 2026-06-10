import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TrackForm } from '../track-form/track-form';
import { TrackService } from '../services/track.service';
import { Track } from '../models/track';

@Component({
  selector: 'app-track-new',
  imports: [TrackForm, RouterLink],
  templateUrl: './track-new.html',
})
export class TrackNew {
  private trackService = inject(TrackService);
  private router = inject(Router);

  protected addTrack(track: Omit<Track, 'id'>) {
    this.trackService.create(track).subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}
