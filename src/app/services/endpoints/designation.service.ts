import { Injectable } from '@angular/core';
import { HttpServiceService } from '../common/http-service.service';

@Injectable({
  providedIn: 'root'
})
export class DesignationService {
  constructor(private http: HttpServiceService) { }

  //create Designation

  createDesignation(data) {
    return this.http.post('/api/Designation/InsertDesignation', data);
  }

  getDesignationById(id) {
    return this.http.get('/api/Designation/GetByIdDesignation?id=' + id);
  }
  getAllDesignation() {
    return this.http.get('/api/Designation/GetDesignation');
  }
  deleteDesignation(id) {
    return this.http.post('/api/Designation/DeleteDesignation', id);
  }
  updateDesignation(data) {
    return this.http.post('/api/Designation/UpdateDesignation', data);
  }
}