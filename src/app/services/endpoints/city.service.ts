import { Injectable } from '@angular/core';
import { HttpServiceService } from '../common/http-service.service';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  constructor(private http: HttpServiceService) { }

  //create City

  createCity(data) {
    return this.http.post('/api/MstCity/InsertMstCity', data);
  }

  getCityById(id) {
    return this.http.get('/api/MstCity/GetByIdMstCity?id=' + id);
  }
  getAllCity() {
    return this.http.get('/api/MstCity/GetMstCity');
  }
  deleteCity(id) {
    return this.http.post('/api/MstCity/DeleteMstCity', id);
  }
  updateCity(data) {
    return this.http.post('/api/MstCity/UpdateMstCity', data);
  }
}