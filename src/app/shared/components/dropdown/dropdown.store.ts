import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';

interface DropdownState {
  openDropdownId: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class DropdownStore extends ComponentStore<DropdownState> {
  constructor() {
    super({ openDropdownId: null });
  }

  readonly openDropdown = this.updater((state, id: string) => ({
    ...state,
    openDropdownId: id,
  }));

  readonly closeDropdown = this.updater((state) => ({
    ...state,
    openDropdownId: null,
  }));

  readonly openDropdownId$ = this.select((state) => state.openDropdownId);
}
