import { Injectable } from '@angular/core';
import { HttpServiceService } from '../common/http-service.service';

@Injectable({
  providedIn: 'root'
})
export class FeesSubmitService {
  constructor(private http: HttpServiceService) { }

  //create FeesSubmit

  createFeesSubmit(data) {
    return this.http.post('/api/FeesSubmitt/InsertFeesSubmitt', data);
  }

  getFeesSubmitById(id) {
    return this.http.get('/api/FeesSubmitt/GetByIdFeesSubmitt?id=' + id);
  }
  getAllFeesSubmit() {
    return this.http.get('/api/FeesSubmitt/GetFeesSubmitt');
  }
  deleteFeesSubmit(id) {
    return this.http.post('/api/FeesSubmitt/DeleteFeesSubmitt', id);
  }
  updateFeesSubmit(data) {
    return this.http.post('/api/FeesSubmitt/UpdateFeesSubmitt', data);
  }
}
