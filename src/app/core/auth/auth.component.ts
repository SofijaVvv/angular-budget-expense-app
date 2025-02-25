import { Component, OnInit } from '@angular/core';
import { NgClass, NgOptimizedImage } from '@angular/common';
import { UserFacade } from './services/user.facade';
import { ActivatedRoute, RouterLink } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

interface AuthForm {
  email: FormControl<string>;
  fullName?: FormControl<string>;
  password: FormControl<string>;
}

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [NgOptimizedImage, RouterLink, ReactiveFormsModule, NgClass],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.sass',
})
export default class AuthComponent implements OnInit {
  authType = '';
  authForm: FormGroup<AuthForm>;
  constructor(
    private authFacade: UserFacade,
    private route: ActivatedRoute,
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
  }

  ngOnInit() {
    this.authType = this.route.snapshot.url.at(-1)!.path;
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
    this.authFacade.login(credentials);
  }

  onRegister() {
    const credentials = this.authForm.value as {
      email: string;
      fullName: string;
      password: string;
    };
    this.authFacade.register(credentials);
  }
}
