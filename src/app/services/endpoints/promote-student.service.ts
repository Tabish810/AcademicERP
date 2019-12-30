import { Injectable } from '@angular/core';
import { HttpServiceService } from '../common/http-service.service';

@Injectable({
  providedIn: 'root'
})
export class PromoteStudentService {

  constructor(private http: HttpServiceService) { }

  //create PromoteStudent

  createPromoteStudent(data) {
    return this.http.post('/api/studentpromote/InsertStudentPromote', data);
  }

  getPromoteStudentById(id) {
    return this.http.get('/api/studentpromote/StudentPromoteById?id=' + id);
  }
  getAllPromoteStudent() {
    return this.http.get('/api/studentpromote/GetStudentPromote');
  }
  deletePromoteStudent(id) {
    return this.http.post('/api/studentpromote/DeleteStudentPromote', id);
  }
  updatePromoteStudent(data) {
    return this.http.post('/api/studentpromote/UpdateStudentPromote', data);
  }


}

