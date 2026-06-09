import { Component, output, signal } from '@angular/core';
import { form, FormField, required, min, max } from '@angular/forms/signals';
import { Track } from '../models/track';

@Component({
  selector: 'app-track-form',
  imports: [FormField],
  templateUrl: './track-form.html',
  styleUrl: './track-form.css',
})
export class TrackForm {
  protected save = output<Omit<Track, 'id'>>();

  protected model = signal({ title: '', artist: '', rating: 5 });

  protected trackForm = form(this.model, (path) => {
    required(path.title, { message: 'Le titre est requis' });
    required(path.artist, { message: "L'artiste est requis" });
    min(path.rating, 0, { message: 'La note minimale est 0' });
    max(path.rating, 10, { message: 'La note maximale est 10' });
  });

  onSubmit(event: Event) {
    event.preventDefault();
    if (!this.trackForm().valid()) return;

    const { title, artist, rating } = this.model();
    this.save.emit({
      title: title.trim(),
      artist: artist.trim(),
      rating,
      album: '',
      genre: '',
      durationSeconds: 0,
      year: new Date().getFullYear(),
      favorite: false,
      coverUrl: `https://picsum.photos/seed/${encodeURIComponent(title)}/300`,
    });

    this.model.set({ title: '', artist: '', rating: 5 });
  }
}
