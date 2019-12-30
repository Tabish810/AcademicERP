import { Injectable } from '@angular/core';
import { HttpServiceService } from '../common/http-service.service';

@Injectable({
  providedIn: 'root'
})
export class BookIssueService {
  constructor(private http: HttpServiceService) { }

  //create IssueBook

  createIssueBook(data) {
    return this.http.post('/api/BookIssue/InsertBookIssue', data);
  }

  getIssueBookById(id) {
    return this.http.get('/api/BookIssue/GetByIdBookIssue?id=' + id);
  }
  getAllIssueBook() {
    return this.http.get('/api/BookIssue/GetBookIssue');
  }
  deleteIssueBook(id) {
    return this.http.post('/api/BookIssue/DeleteBookIssue', id);
  }
  updateIssueBook(data) {
    return this.http.post('/api/BookIssue/UpdateBookIssue', data);
  }
}