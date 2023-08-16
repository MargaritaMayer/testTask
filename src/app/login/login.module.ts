import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuiFieldErrorPipeModule, TuiInputDateModule, TuiInputModule, TuiInputPasswordModule, TuiIslandModule } from '@taiga-ui/kit';
import { TuiButtonModule, TuiErrorModule, TuiHostedDropdownModule, TuiPrimitiveTextfieldModule, TuiSvgModule, TuiTextfieldControllerModule } from '@taiga-ui/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login.component';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    TuiInputModule,
    TuiTextfieldControllerModule,
    FormsModule,
    ReactiveFormsModule,
    TuiIslandModule,
    TuiInputPasswordModule,
    TuiInputDateModule,
    TuiErrorModule,
    TuiFieldErrorPipeModule,
    TuiHostedDropdownModule,
    TuiPrimitiveTextfieldModule,
    BrowserAnimationsModule,
    TuiSvgModule,
    TuiButtonModule,
    TuiErrorModule,
  ],
  exports: [
    LoginComponent,
]
})

export class LoginModule { }
