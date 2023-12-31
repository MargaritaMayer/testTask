import { Injectable } from "@angular/core";
import { Registration } from '../interfaces/registration';
import { FormControl, FormGroup } from "@angular/forms";
import { BehaviorSubject, distinctUntilChanged } from "rxjs";

@Injectable({providedIn: 'root'})
export class AuthService {

  public isShowRegistration$ = new BehaviorSubject<boolean>(true);
  public isShowLogin$ = new BehaviorSubject<boolean>(false);

  public showLogin(){
    this.isShowRegistration$.next(false);
    this.isShowLogin$.next(true);
  }
  public hideLogin(){
    this.isShowLogin$.next(false);
  }

  public markControlAsTouched(control: FormControl){
    control.valueChanges.pipe(distinctUntilChanged()).subscribe(() => {
        control.markAsTouched();
    })
  }

  public submitRegistration(form: FormGroup){
    const formData = form.value;
    if (!formData.name || ! formData.surname ||
      !formData.email || !formData.password || !formData.dateBirth) return;

    this.postRegistration({
      'name': formData.name,
      'surname':  formData.surname,
      'email': formData.email,
      'password': formData.password,
      'birthDate': `${formData.dateBirth.day}.${formData.dateBirth.month}.${formData.dateBirth.year}`
    }).then(responseStatus => {
      if (responseStatus) {
        this.showLogin();
      }
    })
  }

  async postRegistration(data: Registration): Promise<boolean> {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users', {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(data),
      })
      return response.ok;
    } catch (error) {
      console.error("Registration error:", error);
      return false;
    }
  }
}

