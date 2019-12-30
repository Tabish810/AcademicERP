import { Injectable } from '@angular/core';
import { HttpServiceService } from '../common/http-service.service';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  constructor(private http: HttpServiceService) { }

  //create Event

  createEvent(data) {
    return this.http.post('/api/MstEvent/InsertMstEvent', data);
  }

  getEventById(id) {
    return this.http.get('/api/MstEvent/MstEventById?id=' + id);
  }
  getAllEvent() {
    return this.http.get('/api/MstEvent/GetAllMstEvent');
  }
  deleteEvent(id) {
    return this.http.post('/api/MstEvent/DeleteMstEvent', id);
  }
  updateEvent(data) {
    return this.http.post('/api/MstEvent/UpdateMstEvent', data);
  }
}