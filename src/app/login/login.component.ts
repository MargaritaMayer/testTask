import { AuthService } from './../shared/services/auth.service';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TUI_VALIDATION_ERRORS } from '@taiga-ui/kit';

function minLengthValidator(context: {requiredLength: string}): string {
  return `Минимальная длина — ${context.requiredLength} символов`;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: TUI_VALIDATION_ERRORS,
      useValue: {
        required: 'Поле обязательно для заполнения',
        email: 'Введите корректный email',
        minlength: minLengthValidator,
      },
    },
  ],
})
export class LoginComponent {

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    const controls = this.loginForm.controls;
    this.authService.markControlAsTouched(controls.email);
    this.authService.markControlAsTouched(controls.password);
  };


  public loginForm = new FormGroup({
    email: new FormControl<string | null>(null, [Validators.required, Validators.email,]),
    password: new FormControl<string | null>(null, [Validators.required, Validators.minLength(8)]),
  });

}
