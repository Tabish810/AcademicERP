import { Injectable } from '@angular/core';
import { HttpServiceService } from '../common/http-service.service';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  constructor(private http: HttpServiceService) { }

  //create Subject

  createSubject(data) {
    return this.http.post('/api/Subject/InsertSubject', data);
  }

  getSubjectById(id) {
    return this.http.get('/api/Subject/GetByIDSubject' + id);
  }
  getAllSubject() {
    return this.http.get('/api/Subject/GetSubject');
  }
  deleteSubject(id) {
    return this.http.post('/api/Subject/DeleteSubject', id);
  }
  updateSubject(data) {
    return this.http.post('/api/Subject/UpdateSubject', data);
  }


}

