import { Injectable } from '@angular/core';
import { HttpServiceService } from '../common/http-service.service';

@Injectable({
  providedIn: 'root'
})
export class BookEntryService {
  constructor(private http: HttpServiceService) { }

  //create Book

  createBook(data) {
    return this.http.post('/api/MstBook/InsertMstBook', data);
  }

  getBookById(id) {
    return this.http.get('/api/MstBook/GetByIdMstBook?id=' + id);
  }
  getAllBook() {
    return this.http.get('/api/MstBook/GetMstBook');
  }
  deleteBook(id) {
    return this.http.post('/api/MstBook/DeleteMstBook', id);
  }
  updateBook(data) {
    return this.http.post('/api/MstBook/UpdateMstBook', data);
  }
}