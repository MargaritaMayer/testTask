import { TableRow } from './../shared/interfaces/table-row';
import { Component, OnInit } from '@angular/core';
import { TableService } from '../shared/services/table.service';
import { BehaviorSubject } from 'rxjs';
import { FormArray, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.less']
})
export class TableComponent implements OnInit {

  constructor(
    private tableService: TableService,
    private fb: FormBuilder
  ) {}

  public tableForm: FormGroup | null = null;

  private paginationSize: number = 10;
  public paginationLength$: BehaviorSubject<number> =  new BehaviorSubject<number>(1);
  public paginationIndex$: BehaviorSubject<number> =  new BehaviorSubject<number>(0);
  public paginationArray$ = new BehaviorSubject<number[]>(Array(10).fill(0).map((_,i)=>i));

  async ngOnInit(): Promise<void> {
    const tableRows: TableRow[] | null = await this.tableService.getTableRows();
    if (!tableRows) return;
    this.paginationLength$.next(Math.ceil(tableRows.length/this.paginationSize));
    this.tableForm = this.fb.group({
      rowsArray: this.fb.array<TableRow>([]),
    });

    for (let i = 0; i < tableRows.length; i++) {
      this.rowsArray.push(
        this.fb.group({
          userId: new FormControl<string>({'value': tableRows[i]['userId'].toString(), 'disabled': true}, Validators.required),
          id: new FormControl<string>({'value': tableRows[i]['id'].toString(),'disabled': true}, Validators.required),
          title: new FormControl<string>({'value': tableRows[i]['title'], 'disabled': true}, Validators.required),
          body: new FormControl<string>({'value': tableRows[i]['body'], 'disabled': true}, Validators.required),
          isEdit: new FormControl<boolean>(false),
        })
      );
    }
  }

  public get rowsArray(): FormArray<FormGroup> {
    return this.tableForm?.get('rowsArray') as FormArray;
  }

  public changePage(index: number): void {
    this.paginationIndex$.next(index);
    this.paginationArray$.next(Array(10).fill(0).map((_,i)=>10*index+i));
  }

  public addRow(): void{
    this.rowsArray.insert(0, this.fb.group({
      userId: new FormControl<string>(Math.floor(this.rowsArray.length/10+1).toString()),
      id: new FormControl<string>({'value': (this.rowsArray.length+1).toString(), 'disabled': true}),
      title: new FormControl<string>(''),
      body: new FormControl<string>(''),
      isEdit: new FormControl<boolean>(false),
    }));
    this.changeRow(0);
  }

  public changeRow(i: number) {
    const row = this.rowsArray.controls[i];
    const isEditControl  = row.controls?.['isEdit']
    isEditControl.setValue(!isEditControl.value)
    if (isEditControl.value){
      row.controls?.['userId'].enable();
      row.controls?.['title'].enable();
      row.controls?.['body'].enable();
    } else {
      row.controls?.['userId'].disable();
      row.controls?.['id'].disable();
      row.controls?.['title'].disable();
      row.controls?.['body'].disable();

    }
  }
}







