import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home').then((m) => m.Home),
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login').then((m) => m.Login),
  },
  {
    path: 'register',
    loadComponent: () => import('./register/register').then((m) => m.Register),
  },
  {
    path: 'tracks/new',
    canActivate: [authGuard],
    loadComponent: () => import('./track-new/track-new').then((m) => m.TrackNew),
  },
  {
    path: 'tracks/:trackId/edit',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./track-edit/track-edit').then((m) => m.TrackEdit),
  },
  {
    path: 'tracks/:trackId',
    loadComponent: () =>
      import('./track-detail/track-detail').then((m) => m.TrackDetail),
  },
  { path: '**', redirectTo: '' },
];
