import { Registration } from './../shared/interfaces/registration';
import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { TUI_LAST_DAY, TuiDay, TuiValidationError } from '@taiga-ui/cdk';
import { TUI_VALIDATION_ERRORS, TuiNamedDay } from '@taiga-ui/kit';
import { AuthService } from '../shared/services/auth.service';
import { distinctUntilChanged } from 'rxjs';

const nameChars = /^[а-яА-я]+$/;

function getAge(birthTuiDay: TuiDay) {
  const today = new Date();
  const birthDate = new Date(birthTuiDay.year, birthTuiDay.month, birthTuiDay.day);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
  }
  return age;
}

function maxLengthValidator(context: {requiredLength: string}): string {
  return `Максимальная длина — ${context.requiredLength} символов`;
}

function minLengthValidator(context: {requiredLength: string}): string {
  return `Минимальная длина — ${context.requiredLength} символов`;
}

function ruTextValidator(field: AbstractControl): Validators | null {
  return field.value && nameChars.test(field.value) ? null : {
    other: 'Введите на русском языке',
  };

}

function ageValidator(field: AbstractControl): Validators | null {
  return !field.value || getAge(field.value) >= 18 ? null : {
    other: 'Ваш возраст меньше 18 лет',
  };
}

function samePasswordValidator(field: AbstractControl): Validators | null {
  console.log(field);
  return (field.parent && field.parent.value.password === field.value) ? null : {
    other: "Пароли не совпадают"
  }
}

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
    this.markControlAsTouched(controls.name);
    this.markControlAsTouched(controls.surname);
    this.markControlAsTouched(controls.email);
    this.markControlAsTouched(controls.dateBirth);
    this.markControlAsTouched(controls.password);
    this.markControlAsTouched(controls.password2);
  };

  public markControlAsTouched(control: FormControl){
    control.valueChanges.pipe(distinctUntilChanged()).subscribe(() => {
        control.markAsTouched();
    })
  }


  public registrationForm = new FormGroup({
    name: new FormControl<string | null>(null, [Validators.required, Validators.maxLength(15), ruTextValidator]),
    surname: new FormControl<string | null>(null, [Validators.required, Validators.maxLength(15), ruTextValidator]),
    email: new FormControl<string | null>(null, [Validators.required, Validators.email,]),
    dateBirth: new FormControl<TuiDay | null>(null, [Validators.required, ageValidator]),
    password: new FormControl<string | null>(null, [Validators.required, Validators.minLength(8), samePasswordValidator]),
    password2: new FormControl<string | null>(null, [Validators.required, Validators.minLength(8), samePasswordValidator]),
  });

  public minDay: TuiDay = new TuiDay(1910, 0, 1);
  public maxDay: TuiDay = TuiDay.currentLocal();

}
