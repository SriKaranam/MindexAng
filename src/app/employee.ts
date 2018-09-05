export class Employee {
  id: number;
  firstName: string;
  lastName: string;
  position: string;
  compensation: number;
  reportsCount: any;
  directReportsEmployees: any;
  directReports?: number[];
}
