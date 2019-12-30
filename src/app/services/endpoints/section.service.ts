import { Injectable } from '@angular/core';
import { HttpServiceService } from '../common/http-service.service';

@Injectable({
  providedIn: 'root'
})
export class SectionService {

  constructor(private http: HttpServiceService) { }

  //create Section

  createSection(data) {
    return this.http.post('/api/Section/InsertSection', data);
  }

  getSectionById(id) {
    return this.http.getid('/api/Section/GetByIDSection?id=' + id);
  }
  getAllSection() {
    return this.http.get('/api/Section/GetSection');
  }
  deleteSection(id) {
    return this.http.post('/api/Section/DeleteSection', id);
  }
  updateSection(data) {
    return this.http.post('/api/Section/UpdateSection', data);
  }


}
