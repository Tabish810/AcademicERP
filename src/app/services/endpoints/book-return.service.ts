import { Injectable } from '@angular/core';
import { HttpServiceService } from '../common/http-service.service';

@Injectable({
  providedIn: 'root'
})
export class BookReturnService {
  constructor(private http: HttpServiceService) { }

  //create BookReturn

  createBookReturn(data) {
    return this.http.post('/api/BbookReturn/InsertBbookReturn', data);
  }

  getBookReturnById(id) {
    return this.http.get('/api/BbookReturn/GetByIdBbookReturn?id=' + id);
  }
  getAllBookReturn() {
    return this.http.get('/api/BbookReturn/GetBbookReturn');
  }
  deleteBookReturn(id) {
    return this.http.post('/api/BbookReturn/DeleteBbookReturn', id);
  }
  updateBookReturn(data) {
    return this.http.post('/api/BbookReturn/UpdateBbookReturn', data);
  }
}