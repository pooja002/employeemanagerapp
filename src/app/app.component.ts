import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Employee } from './employee';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = "employeemanagerapp";
  public employeesArray:Employee[];
  public editEmployee:Employee;
  public deleteEmployee : Employee;

  constructor(private employeeService:EmployeeService)
  {

  }
  ngOnInit() {
    this.getEmployees();
  }
  
  public getEmployees():void
  {
    this.employeeService.getEmployees().subscribe(
      (response : Employee[]) =>
      {
        this.employeesArray = response;
        console.log(this.employeesArray);
      },

      (error : HttpErrorResponse) =>
      {
        alert(error.message);
      }
    )

  }
  

  public addEmployee(form : NgForm) : void
  {
      document.getElementById('add-employee-form').click();
      this.employeeService.addEmployee(form.value).subscribe(
        (response:Employee) =>
        {
          console.log(response);
          this.getEmployees();
          form.reset();
        },
        (error:HttpErrorResponse) =>
        {
          alert(error.message);
          form.reset();
        }
      );
  }


  public updateEmployee(employee:Employee):void
  {
    
    this.employeeService.updateEmployee(employee).subscribe(

      (response:Employee)=>
      {
        console.log(response);
        this.getEmployees();
      },

      (error:HttpErrorResponse)=>
      {
        alert(error.message);
      }
    );
  }


  public OndeleteEmployee(employeeId:number): void
  {
    this.employeeService.deleteEmployee(employeeId).subscribe(
      (response:void)=>{
            console.log(response);
            this.getEmployees();
      },
      (error:HttpErrorResponse)=>
      {
          console.log(error.message);
      }
    );
  }


  
  public searchEmployees(key: string): void {
    console.log(key);
    const results: Employee[] = [];
    for (const employee of this.employeesArray) {
      if (employee.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employee.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employee.phone.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employee.jobTitle.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(employee);
      }
    }
    this.employeesArray = results;
    if (results.length === 0 || !key) {
      this.getEmployees();
    }
  }

  
  public onOpenModal(employee: Employee, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addEmployeeModal');
    }
    if (mode === 'edit') {
      this.editEmployee = employee;
      button.setAttribute('data-target', '#updateEmployeeModal');
    }
    if (mode === 'delete') {
      this.deleteEmployee = employee;
      button.setAttribute('data-target', '#deleteEmployeeModal');
    }
    container.appendChild(button);
    button.click();
  }

  


}
