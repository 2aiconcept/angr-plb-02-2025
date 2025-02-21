import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-page-sign-in',
  imports: [ReactiveFormsModule],
  templateUrl: './page-sign-in.component.html',
  styleUrl: './page-sign-in.component.scss',
})
export class PageSignInComponent {
  public form!: FormGroup;
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  public signIn(): void {
    // console.log(this.form.value);
    const credentials = this.form.value;
    this.authService.signIn(credentials).subscribe();
  }
}
