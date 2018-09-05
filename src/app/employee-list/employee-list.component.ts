import {Component, OnInit} from '@angular/core';
import {catchError, map, reduce} from 'rxjs/operators';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import {Employee} from '../employee';
import {EmployeeService} from '../employee.service';
import {EmployeeDeleteDialog} from '../employee/employee.delete.dialog.component';
import {EmployeeEditDialog} from '../employee/employee.edit.dialog.component';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  errorMessage: string;

  constructor(private employeeService: EmployeeService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
   this.getAllEmployees();
  }

  private getAllEmployees () {
   this.employeeService.getAll()
      .pipe(
        reduce((emps, e: Employee) => emps.concat(e), []),
        map(emps => this.employees = emps),
        catchError(this.handleError.bind(this))
      ).subscribe();
  }

  private handleError(e: Error | any): string {
    console.error(e);
    return this.errorMessage = e.message || 'Unable to retrieve employees';
  }


  private handleEmployeeEditRequest ( employee: Employee ) {
    this.openEditDialog( employee );
  }
  private handleEmployeeDeleteRequest ( employee: Employee ) {
    this.openDeleteDialog( employee );
  }


  private openDeleteDialog ( employee: Employee ): void {
    const dialogRef = this.dialog.open(EmployeeDeleteDialog, {
      data: employee
    });

    dialogRef.afterClosed().subscribe( ( shouldDelete: boolean ) => {
      if ( shouldDelete ) {
        this.employeeService.remove( employee ).pipe(
          map(() => this.getAllEmployees()),
          catchError(this.handleError.bind(this))
        ).subscribe();
      }
    });
  }

  private openEditDialog ( employee: Employee ): void {
    const dialogRef = this.dialog.open(EmployeeEditDialog, {
      data: employee
    });

    dialogRef.afterClosed().subscribe( ( newEmployee: Employee ) => {


      if ( newEmployee ) {
        this.employeeService.save( newEmployee ).pipe(
          map(() => this.getAllEmployees()),
          catchError(this.handleError.bind(this))
        ).subscribe();      
      }

    });
  }

}
