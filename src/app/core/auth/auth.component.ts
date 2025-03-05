import { Component, OnDestroy, OnInit } from '@angular/core';
import { AsyncPipe, NgClass, NgIf, NgOptimizedImage } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from './services/user.service';
import { UserFacade } from './services/user.facade';
import { Subscription } from 'rxjs';
import { ButtonComponent } from '../../shared/components/button/button.component';

interface AuthForm {
  email: FormControl<string>;
  fullName?: FormControl<string>;
  password: FormControl<string>;
}

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    NgOptimizedImage,
    RouterLink,
    ReactiveFormsModule,
    NgClass,
    AsyncPipe,
    NgIf,
    ButtonComponent,
  ],
  templateUrl: './auth.component.html',
})
export default class AuthComponent implements OnInit, OnDestroy {
  authType = '';
  authForm: FormGroup<AuthForm>;
  loginError: string | null = null;
  registerError: string | null = null;
  private readonly authErrorSubscription: Subscription;
  constructor(
    private activatedRoute: ActivatedRoute,
    private userFacade: UserFacade,
    private userService: UserService,
    private router: Router,
  ) {
    this.authForm = new FormGroup<AuthForm>({
      email: new FormControl('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
      password: new FormControl('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
    });

    this.authErrorSubscription = this.userFacade.authError$.subscribe(
      (error) => {
        this.loginError = error;
      },
    );
  }

  ngOnInit() {
    this.authType = this.activatedRoute.snapshot.url.at(-1)!.path;
    this.initializeForm();
    this.resetErrors();
  }

  ngOnDestroy() {
    if (this.authErrorSubscription) {
      this.authErrorSubscription.unsubscribe();
    }
  }

  private resetErrors() {
    this.loginError = null;
    this.registerError = null;
  }

  private initializeForm() {
    if (this.authType === 'register') {
      this.authForm.addControl(
        'fullName',
        new FormControl('', {
          validators: [Validators.required],
          nonNullable: true,
        }),
      );
    }
  }

  onSubmit() {
    this.authType === 'login' ? this.onLogin() : this.onRegister();
  }

  onLogin() {
    const credentials = this.authForm.value as {
      email: string;
      password: string;
    };
    this.userFacade.login(credentials);
  }

  onRegister() {
    const credentials = this.authForm.value as {
      email: string;
      fullName: string;
      password: string;
    };
    this.userService.register(credentials).subscribe({
      next: () => {
        void this.router.navigate(['/login']);
      },
      error: (err) => {
        this.registerError =
          err?.error?.message || 'Registration failed: user already exists.';
      },
    });
  }
}
