import {OnInit, Component, Input, Output, EventEmitter} from '@angular/core';
import {catchError, map, reduce} from 'rxjs/operators';

import {Employee} from '../employee';
import {EmployeeService} from '../employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
	errorMessage;
	
	@Input() employee: Employee;  
	@Output() edit: EventEmitter<any> = new EventEmitter();
	@Output() delete: EventEmitter<any> = new EventEmitter();

	constructor(private employeeService: EmployeeService) {

	}

  ngOnInit() {

	  	if ( this.employee ) {

	  		this.employee.reportsCount = ( this.employee.directReports || [] ).length || 0;
	  		this.employee.directReportsEmployees = [];

	  		( this.employee.directReports || [] ).forEach( ( id: number, index: number ) => {

				this.employeeService.get( id )
					.pipe(
						map(emp => { 
							this.employee.directReportsEmployees[ index ] = emp 
						}),
						catchError(this.handleError.bind(this))
					)
				.subscribe()
				;
	  		})
		}
  }

  private handleError(e: Error | any): string {
    console.error(e);
    return this.errorMessage = e.message || 'Unable to retrieve employees';
  }


  editEmployee ( employee: Employee ) {
	this.edit.emit( employee );
	}

  deleteEmployee ( employee: Employee ) {
        this.delete.emit( employee );
    }
}
