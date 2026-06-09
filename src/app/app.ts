import { Component, computed, inject, linkedSignal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { TrackList } from './track-list/track-list';
import { TrackForm } from './track-form/track-form';
import { TrackService } from './services/track.service';
import { Track } from './models/track';

@Component({
  selector: 'app-root',
  imports: [TrackList, TrackForm],
  templateUrl: './app.html',
})
export class App {
  private trackService = inject(TrackService);

  private loadedTracks = toSignal(this.trackService.getTracks());

  protected loading = computed(() => this.loadedTracks() === undefined);

  protected tracks = linkedSignal(() => {
    const loaded = this.loadedTracks();
    if (loaded === undefined) {
      return [];
    } else {
      return loaded;
    }
  });

  protected addTrack(track: Omit<Track, 'id'>) {
    const nextId = Math.max(0, ...this.tracks().map((t) => t.id)) + 1;
    this.tracks.update((tracks) => [...tracks, { ...track, id: nextId }]);
  }
}
