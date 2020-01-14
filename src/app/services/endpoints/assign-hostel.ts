import { Injectable } from '@angular/core';
import { HttpServiceService } from '../common/http-service.service';

@Injectable({
  providedIn: 'root'
})
export class AssignHostelService {

  constructor(private http: HttpServiceService) { }

  //create AssignAssignVehicle

  createAssignHostel(data) {
    return this.http.post('/api/AssignHouse/InsertAssignHouse', data);
  }

  getAssignHostelById(id) {
    return this.http.getid('/api/AssignHostel/AssignHostelById?id=' + id);
  }
  getAllAssignHostel() {
    return this.http.get('/api/AssignHouse/GetAssignHouse');
  }
  deleteAssignHostel(id) {
    return this.http.post('/api/AssignHouse/DeleteAssignHouse', id);
  }
  updateAssignHostel(data) {
    return this.http.post('/api/AssignHostel/UpdateAssignHostel', data);
  }


}
