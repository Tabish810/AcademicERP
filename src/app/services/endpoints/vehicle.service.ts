import { Injectable } from '@angular/core';
import { HttpServiceService } from '../common/http-service.service';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  constructor(private http: HttpServiceService) { }

  //create Vehicle

  createVehicle(data) {
    return this.http.post('/api/MstVehicle/InsertMstVehicle', data);
  }

  getVehicleById(id) {
    return this.http.getid('/api/MstVehicle/MstVehicleById?id=' + id);
  }
  getAllVehicle() {
    return this.http.get('/api/MstVehicle/GetMstVehicle');
  }
  deleteVehicle(id) {
    return this.http.post('/api/MstVehicle/DeleteMstVehicle', id);
  }
  updateVehicle(data) {
    return this.http.post('/api/MstVehicle/UpdateMstVehicle', data);
  }


}
