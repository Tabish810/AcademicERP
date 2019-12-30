import { Injectable } from '@angular/core';
import { HttpServiceService } from '../common/http-service.service';

@Injectable({
  providedIn: 'root'
})
export class GradeService {
  constructor(private http: HttpServiceService) { }

  //create Grade

  createGrade(data) {
    return this.http.post('/api/ExamGrade/InsertExamGrade', data);
  }

  getGradeById(id) {
    return this.http.get('/api/ExamGrade/ExamGradeById?id=' + id);
  }
  getAllGrades() {
    return this.http.get('/api/ExamGrade/GetAllExamGrade');
  }
  deleteGrade(id) {
    return this.http.post('/api/ExamGrade/DeleteExamGrade', id);
  }
  updateGrade(data) {
    return this.http.post('/api/ExamGrade/UpdateExamGrade', data);
  }
}