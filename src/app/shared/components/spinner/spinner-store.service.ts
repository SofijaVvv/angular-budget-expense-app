import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';

interface SpinnerState {
  isLoading: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class SpinnerStoreService extends ComponentStore<SpinnerState> {
  readonly isLoading$ = this.select((state) => state.isLoading);

  constructor() {
    super({ isLoading: false });
  }

  readonly show = this.updater(
    (state): SpinnerState => ({ ...state, isLoading: true }),
  );
  readonly hide = this.updater(
    (state): SpinnerState => ({ ...state, isLoading: false }),
  );
}
