import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { FeaturesService } from '../services/features.service';

/**
 * Protège la route /favorites derrière le feature flag.
 * Si la fonctionnalité est désactivée, redirige vers le catalogue.
 */
export const favoritesEnabledGuard: CanActivateFn = () => {
  const features = inject(FeaturesService);
  const router = inject(Router);

  if (features.favorites) {
    return true;
  } else {
    return router.createUrlTree(['/']);
  }
};
