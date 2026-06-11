import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';


@Injectable({ providedIn: 'root' })
export class FeaturesService {
  readonly favorites = environment.features.favorites;
}
