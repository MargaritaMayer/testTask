import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { TuiRootModule, TuiAlertModule } from '@taiga-ui/core';
import { RegistrationModule } from './registration/registration.module';
import { LoginModule } from './login/login.module';
import { TableModule } from './table/table.module';
import { TuiLetModule } from "@taiga-ui/cdk";


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    TuiRootModule,
    RegistrationModule,
    LoginModule,
    TableModule,
    BrowserAnimationsModule,
    TuiAlertModule,
    TuiLetModule,
  ],
  providers: [
  ],
  bootstrap: [AppComponent],


})
export class AppModule { }
