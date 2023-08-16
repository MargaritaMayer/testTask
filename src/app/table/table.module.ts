import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table.component';
import { TuiCheckboxModule, TuiDataListWrapperModule, TuiInputModule, TuiInputNumberModule, TuiPaginationModule, TuiSelectModule, TuiTextareaModule } from '@taiga-ui/kit';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {TuiTableModule} from '@taiga-ui/addon-table';
import { TuiButtonModule, TuiFormatNumberPipeModule, TuiSvgModule, TuiTextfieldControllerModule } from '@taiga-ui/core';
import { TuiLetModule } from '@taiga-ui/cdk';

@NgModule({
  declarations: [
    TableComponent
  ],
  imports: [
    CommonModule,
    TuiCheckboxModule,
    ReactiveFormsModule,
    TuiPaginationModule,
    TuiTextareaModule,
    TuiDataListWrapperModule,
    TuiSvgModule,
    TuiFormatNumberPipeModule,
    TuiSelectModule,
    TuiTableModule,
    FormsModule,
    TuiInputNumberModule,
    TuiLetModule,
    TuiInputModule,
    TuiTextfieldControllerModule,
    TuiButtonModule,
  ],
  exports: [
    TableComponent,
  ]
})

export class TableModule {}
