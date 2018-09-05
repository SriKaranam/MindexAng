import {Component, OnInit, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import {Employee} from '../employee';

@Component({
  selector: 'employee-edit-dialog',
  templateUrl: 'employee-edit-dialog.html',
})
export class EmployeeEditDialog {

  private originalEmployee: Employee;

  	constructor(
		public dialogRef: MatDialogRef<EmployeeEditDialog>,
		@Inject(MAT_DIALOG_DATA) public employee: Employee
	) {

      this.employee.compensation = this.employee.compensation || 0;

      this.originalEmployee = { ...this.employee };

    }

  onYesClick(): void {
    this.dialogRef.close( this.employee );
  }

  onNoClick(): void {
    this.dialogRef.close( false );
  }

}