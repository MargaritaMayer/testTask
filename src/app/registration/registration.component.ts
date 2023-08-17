import { Registration } from './../shared/interfaces/registration';
import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { TUI_LAST_DAY, TuiDay, TuiValidationError } from '@taiga-ui/cdk';
import { TUI_VALIDATION_ERRORS, TuiNamedDay } from '@taiga-ui/kit';
import { AuthService } from '../shared/services/auth.service';
import {
  maxLengthValidator,
  ruTextValidator,
  minLengthValidator,
  ageValidator,
  samePasswordValidator
} from '../shared/services/validators.service';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: TUI_VALIDATION_ERRORS,
      useValue: {
        required: 'Поле обязательно для заполнения',
        email: 'Введите корректный email',
        minlength: minLengthValidator,
        maxlength: maxLengthValidator,
      },
    },
  ],
})

export class RegistrationComponent implements OnInit {

  constructor(public authService: AuthService){}
  ngOnInit(): void {

    const controls = this.registrationForm.controls;
    this.authService.markControlAsTouched(controls.name);
    this.authService.markControlAsTouched(controls.surname);
    this.authService.markControlAsTouched(controls.email);
    this.authService.markControlAsTouched(controls.dateBirth);
    this.authService.markControlAsTouched(controls.password);
    this.authService.markControlAsTouched(controls.password2);
  };




  public registrationForm = new FormGroup({
    name: new FormControl<string | null>(null, [Validators.required, Validators.maxLength(15), ruTextValidator]),
    surname: new FormControl<string | null>(null, [Validators.required, Validators.maxLength(15), ruTextValidator]),
    email: new FormControl<string | null>(null, [Validators.required, Validators.email,]),
    dateBirth: new FormControl<TuiDay | null>(null, [Validators.required, ageValidator]),
    password: new FormControl<string | null>(null, [Validators.required, Validators.minLength(8)]),
    password2: new FormControl<string | null>(null, [Validators.required, Validators.minLength(8), samePasswordValidator]),
  });

  public minDay: TuiDay = new TuiDay(1910, 0, 1);
  public maxDay: TuiDay = TuiDay.currentLocal();

}
