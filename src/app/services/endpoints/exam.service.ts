import { Injectable } from '@angular/core';
import { HttpServiceService } from '../common/http-service.service';

@Injectable({
  providedIn: 'root'
})
export class ExamService {

  constructor(private http: HttpServiceService) { }

  //create FeesDiscount

  createExam(data) {
    return this.http.post('/api/MstExam/InsertMstExam', data);
  }
  insertMarksheet(payload) {
    return this.http.post('/api/MarkSheet/InsertMarkSheet', payload);
  }
  getExamById(id) {
    return this.http.get('/api/MstExam/MstExamById?id=' + id);
  }

  getExamByNo(id) {
    return this.http.get('/api/MstExam/MstExamByNo?id=' + id);
  }

  getAllExam() {
    return this.http.get('/api/MstExam/GetAllMstExam');
  }

  deleteExam(id) {
    return this.http.post('/api/MstExam/DeleteMstExam', id);
  }

  updateExam(data) {
    return this.http.post('/api/MstExam/UpdateMstExam', data);
  }


}

