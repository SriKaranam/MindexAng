import {Component, OnInit, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import {Employee} from '../employee';

@Component({
  selector: 'employee-delete-dialog',
  templateUrl: 'employee-delete-dialog.html',
})
export class EmployeeDeleteDialog {

  	constructor(
		public dialogRef: MatDialogRef<EmployeeDeleteDialog>,
		@Inject(MAT_DIALOG_DATA) public employee: Employee
	) {

    }

  onYesClick(): void {
    this.dialogRef.close( true );
  }
  onNoClick(): void {
    this.dialogRef.close( false );
  }

}