import { Injectable } from '@angular/core';
import { HttpServiceService } from '../common/http-service.service';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  constructor(private http: HttpServiceService) { }

  //create Student

  createStudent(data) {
    return this.http.post('/api/Student/InsertStudent', data);
  }

  getStudentById(id) {
    return this.http.get('/api/Student/StudentById?id=' + id);
  }
  getAllStudent() {
    return this.http.get('/api/Student/GetStudent');
  }
  deleteStudent(id) {
    return this.http.post('/api/Student/DeleteStudent', id);
  }
  updateStudent(data) {
    return this.http.post('/api/Student/UpdateStudent', data);
  }
}
