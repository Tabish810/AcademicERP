import { Injectable } from '@angular/core';
import { HttpServiceService } from '../common/http-service.service';

@Injectable({
  providedIn: 'root'
})
export class HostelService {
  constructor(private http: HttpServiceService) { }

  //create Hostel

  createHostel(data) {
    return this.http.post('/api/House/InsertHouse', data);
  }

  getHostelById(id) {
    return this.http.get('/api/House/GetByIdHouse?id=' + id);
  }
  getAllHostels() {
    return this.http.get('/api/House/GetHouse');
  }
  deleteHostel(id) {
    return this.http.post('/api/House/DeleteHouse', id);
  }
  updateHostel(data) {
    return this.http.post('/api/House/UpdateHouse', data);
  }
}