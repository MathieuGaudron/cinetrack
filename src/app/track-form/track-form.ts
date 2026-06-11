import { Component, input, linkedSignal, output } from '@angular/core';
import { form, FormField, required, min, max } from '@angular/forms/signals';
import { Track } from '../models/track';

@Component({
  selector: 'app-track-form',
  imports: [FormField],
  templateUrl: './track-form.html',
  styleUrl: './track-form.css',
})
export class TrackForm {
  // Fourni en mode édition pour préremplir le formulaire ; null en création.
  initial = input<Track | null>(null);
  protected save = output<Omit<Track, 'id'>>();

  // Se resynchronise quand `initial` change (morceau chargé en différé).
  protected model = linkedSignal(() => {
    const track = this.initial();
    if (track) {
      return { title: track.title, artist: track.artist, rating: track.rating };
    } else {
      return { title: '', artist: '', rating: 5 };
    }
  });

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
    const existing = this.initial();

    if (existing) {
      // Édition : on conserve les champs non éditables du morceau existant.
      const { id, ...rest } = existing;
      this.save.emit({
        ...rest,
        title: title.trim(),
        artist: artist.trim(),
        rating,
      });
    } else {
      // Création : valeurs par défaut pour les champs non saisis.
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
}
