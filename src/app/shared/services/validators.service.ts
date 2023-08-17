import { AbstractControl, Validators } from "@angular/forms";
import { TuiDay } from "@taiga-ui/cdk";


const nameChars = /^[а-яА-я]+$/;

export function getAge(birthTuiDay: TuiDay) {
  const today = new Date();
  const birthDate = new Date(birthTuiDay.year, birthTuiDay.month, birthTuiDay.day);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
  }
  return age;
}

export function maxLengthValidator(context: {requiredLength: string}): string {
  return `Максимальная длина — ${context.requiredLength} символов`;
}

export function minLengthValidator(context: {requiredLength: string}): string {
  return `Минимальная длина — ${context.requiredLength} символов`;
}

export function ruTextValidator(field: AbstractControl): Validators | null {
  return field.value && nameChars.test(field.value) ? null : {
    other: 'Введите на русском языке',
  };

}

export function ageValidator(field: AbstractControl): Validators | null {
  return !field.value || getAge(field.value) >= 18 ? null : {
    other: 'Ваш возраст меньше 18 лет',
  };
}

export function samePasswordValidator(field: AbstractControl): Validators | null {
  return (field.parent && field.parent.value.password === field.value) ? null : {
    other: "Пароли не совпадают"
  }
}

export class AuthValidators {}
