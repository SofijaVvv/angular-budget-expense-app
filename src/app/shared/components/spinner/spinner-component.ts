import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerStoreService } from './spinner-store.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './spinner.component.html',
})
export class SpinnerComponent implements OnInit, OnDestroy {
  isLoading: boolean = false;
  private subscription: Subscription | null = null;

  ngOnInit() {
    this.subscription = this.loadingStore.isLoading$.subscribe(
      (loading) => (this.isLoading = loading),
    );
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  constructor(public loadingStore: SpinnerStoreService) {}
}
