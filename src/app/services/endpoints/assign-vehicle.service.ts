import { Injectable } from '@angular/core';
import { HttpServiceService } from '../common/http-service.service';

@Injectable({
  providedIn: 'root'
})
export class AssignVehicleService {

  constructor(private http: HttpServiceService) { }

  //create AssignAssignVehicle

  createAssignVehicle(data) {
    return this.http.post('/api/AssignVehicle/InsertAssignVehicle', data);
  }

  getAssignVehicleById(id) {
    return this.http.getid('/api/AssignVehicle/AssignVehicleById?id=' + id);
  }
  getAllAssignVehicle() {
    return this.http.get('/api/AssignVehicle/GetAssignVehicle');
  }
  deleteAssignVehicle(id) {
    return this.http.post('/api/AssignVehicle/DeleteAssignVehicle', id);
  }
  updateAssignVehicle(data) {
    return this.http.post('/api/AssignVehicle/UpdateAssignVehicle', data);
  }


}
