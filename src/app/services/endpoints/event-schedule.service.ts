import { Injectable } from '@angular/core';
import { HttpServiceService } from '../common/http-service.service';

@Injectable({
  providedIn: 'root'
})
export class EventScheduleService {
  constructor(private http: HttpServiceService) { }

  //create EventSchedule

  createEventSchedule(data) {
    return this.http.post('/api/EeventSchedule/InsertEeventSchedule', data);
  }

  getEventScheduleById(id) {
    return this.http.get('/api/EeventSchedule/EeventScheduleById?id=' + id);
  }
  getAllEventSchedule() {
    return this.http.get('/api/EeventSchedule/GetAllEeventSchedule');
  }
  deleteEventSchedule(id) {
    return this.http.post('/api/EeventSchedule/DeleteEeventSchedule', id);
  }
  updateEventSchedule(data) {
    return this.http.post('/api/EeventSchedule/UpdateEeventSchedule', data);
  }
}