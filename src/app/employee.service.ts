import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from './employee';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiServerUrl = environment.BaseUrl;

  constructor(private http:HttpClient) { }

  public getEmployees():Observable<any>
  {
    return this.http.get<Employee[]>(`${this.apiServerUrl}/employee/all`);
  }

  public addEmployee(employee:Employee)
  {
    return this.http.post<Employee>(`${this.apiServerUrl}/employee/add`,employee);
  }

  public updateEmployee(employee:Employee)
  {
    return this.http.put<Employee>(`${this.apiServerUrl}/employee/update`,employee);
  }

  public deleteEmployee(employeeId:number): Observable<void>
  {
    return this.http.delete<void>(`${this.apiServerUrl}/employee/delete/${employeeId}`);
  }


}
