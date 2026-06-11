import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Track } from '../models/track';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class TrackService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/tracks`;

  getTracks() {
    return this.http.get<Track[]>(this.baseUrl);
  }

  getTrack(id: number) {
    return this.http.get<Track>(`${this.baseUrl}/${id}`);
  }

  search(query: string) {
    const params = new HttpParams().set('q', query);
    return this.http.get<Track[]>(this.baseUrl, { params });
  }

  create(track: Omit<Track, 'id'>) {
    return this.http.post<Track>(this.baseUrl, track);
  }

  update(id: number, changes: Partial<Track>) {
    return this.http.patch<Track>(`${this.baseUrl}/${id}`, changes);
  }

  remove(id: number) {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  // --- Favoris ---------------------------------------------------------------
  getFavorites() {
    return this.http.get<Track[]>(`${environment.apiUrl}/favorites`);
  }

  addFavorite(id: number) {
    return this.http.post<Track>(`${environment.apiUrl}/favorites/${id}`, {});
  }

  removeFavorite(id: number) {
    return this.http.delete<Track>(`${environment.apiUrl}/favorites/${id}`);
  }
}
