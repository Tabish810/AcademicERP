import { Injectable } from '@angular/core';
import { HttpServiceService } from '../common/http-service.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  constructor(private http: HttpServiceService) { }

  //create Employee

  createEmployee(data) {
    return this.http.post('/api/Employee/InsertEmployee', data);
  }

  getEmployeeById(id) {
    return this.http.get('/api/Employee/EmployeeById?id=' + id);
  }
  getAllEmployee() {
    return this.http.get('/api/Employee/GetAllEmployee');
  }
  deleteEmployee(id) {
    return this.http.post('/api/Employee/DeleteEmployee', id);
  }
  updateEmployee(data) {
    return this.http.post('/api/Employee/UpdateEmployee', data);
  }
}