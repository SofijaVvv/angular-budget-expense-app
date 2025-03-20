import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { Subscription } from 'rxjs';
import { User } from '../../../../core/models/user.model';
import { UserFacade } from '../../../../core/auth/services/user.facade';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [NgOptimizedImage, ButtonComponent],
  templateUrl: './user-details.component.html',
})
export class UserDetailsComponent implements OnInit, OnDestroy {
  private subscription: Subscription | null = null;
  userDetails: User | null = null;

  constructor(private userFacade: UserFacade) {}

  ngOnInit() {
    this.subscription = this.userFacade.user$.subscribe(
      (data) => (this.userDetails = data),
    );
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  onDeleteUserAccount() {
    Swal.fire({
      icon: 'question',
      title: 'Are you sure you want to delete your account?',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.isConfirmed && this.userDetails) {
        this.userFacade.deleteUser(this.userDetails.id);
      }
    });
  }
}
