import { Injectable } from '@angular/core';
import { HttpServiceService } from '../common/http-service.service';

@Injectable({
  providedIn: 'root'
})
export class EventAwardsService {
  constructor(private http: HttpServiceService) { }

  //create EventAwards

  createEventAwards(data) {
    return this.http.post('/api/MstAward/InsertMstAward', data);
  }

  getEventAwardsById(id) {
    return this.http.get('/api/MstAward/MstAwardById?id=' + id);
  }
  getAllEventAwards() {
    return this.http.get('/api/MstAward/GetAllMstAward');
  }
  deleteEventAwards(id) {
    return this.http.post('/api/MstAward/DeleteMstAward', id);
  }
  updateEventAwards(data) {
    return this.http.post('/api/MstAward/UpdateMstAward', data);
  }
}