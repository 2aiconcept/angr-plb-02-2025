import { Component, inject } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-page-sign-up',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './page-sign-up.component.html',
  styleUrl: './page-sign-up.component.scss',
})
export class PageSignUpComponent {
  private auth = inject(AuthService);
  private formBuilder = inject(FormBuilder);
  form!: FormGroup;

  // utiliser la méthode signup() de AuthService
  signUp() {
    const user = this.form.value;
    // console.log(user);
    this.auth.signUp(user).subscribe((data) => {
      console.log(data);
    });
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: [
        '',
        Validators.compose([Validators.required, Validators.minLength(5)]),
      ],
    });
  }
}
