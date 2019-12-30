import { Injectable } from '@angular/core';
import { HttpServiceService } from '../common/http-service.service';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  constructor(private http: HttpServiceService) { }

  //create Country

  createCountry(data) {
    return this.http.post('/api/MstCountry/InsertMstCountry', data);
  }

  getCountryById(id) {
    return this.http.get('/api/MstCountry/GetByIdMstCountry?id=' + id);
  }
  getAllCountry() {
    return this.http.get('/api/MstCountry/GetMstCountry');
  }
  deleteCountry(id) {
    return this.http.post('/api/MstCountry/DeleteMstCountry', id);
  }
  updateCountry(data) {
    return this.http.post('/api/MstCountry/UpdateMstCountry', data);
  }
}