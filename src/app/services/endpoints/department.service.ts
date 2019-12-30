import { Injectable } from '@angular/core';
import { HttpServiceService } from '../common/http-service.service';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  constructor(private http: HttpServiceService) { }

  //create Department

  createDepartment(data) {
    return this.http.post('/api/Department/InsertDepartment', data);
  }

  getDepartmentById(id) {
    return this.http.get('/api/Department/GetByIdDepartment?id=' + id);
  }
  getAllDepartment() {
    return this.http.get('/api/Department/GetDepartment');
  }
  deleteDepartment(id) {
    return this.http.post('/api/Department/DeleteDepartment', id);
  }
  updateDepartment(data) {
    return this.http.post('/api/Department/UpdateDepartment', data);
  }
}