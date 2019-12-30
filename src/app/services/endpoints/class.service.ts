import { Injectable } from '@angular/core';
import { HttpServiceService } from '../common/http-service.service';

@Injectable({
  providedIn: 'root'
})
export class ClassService {

  constructor(private http: HttpServiceService) { }

  //create Class

  createClass(data) {
    return this.http.post('/api/Class/InsertClass', data);
  }

  getClassById(id) {
    return this.http.getid('/api/Class/ClassById?id=' + id);
  }
  getAllClass() {
    return this.http.get('/api/Class/GetClass');
  }
  deleteClass(id) {
    return this.http.post('/api/Class/DeleteClass', id);
  }
  updateClass(data) {
    return this.http.post('/api/Class/UpdateClass', data);
  }


}
