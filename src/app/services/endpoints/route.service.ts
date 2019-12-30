import { Injectable } from '@angular/core';
import { HttpServiceService } from '../common/http-service.service';

@Injectable({
  providedIn: 'root'
})
export class RouteService {

  constructor(private http: HttpServiceService) { }

  //create Route

  createRoute(data) {
    return this.http.post('/api/VehicleRoute/InsertVehicleRoute', data);
  }

  getRouteById(id) {
    return this.http.getid('/api/VehicleRoute/GetByIdVehicleRoute?id=' + id);
  }
  getAllRoute() {
    return this.http.get('/api/VehicleRoute/GetVehicleRoute');
  }
  deleteRoute(id) {
    return this.http.post('/api/VehicleRoute/DeleteVehicleRoute', id);
  }
  updateRoute(data) {
    return this.http.post('/api/VehicleRoute/UpdateVehicleRoute', data);
  }


}
