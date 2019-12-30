import { Injectable } from '@angular/core';
import { HttpServiceService } from '../common/http-service.service';

@Injectable({
  providedIn: 'root'
})
export class DiscountService {

  constructor(private http: HttpServiceService) { }

  //create FeesDiscount

  createFeesDiscount(data) {
    return this.http.post('/api/FeesDiscount/InsertFeesDiscount', data);
  }

  getFeesDiscountById(id) {
    return this.http.get('/api/FeesDiscount/GetByIdFeesDiscount?id=' + id);
  }
  getAllFeesDiscount() {
    return this.http.get('/api/FeesDiscount/GetFeesDiscount');
  }
  deleteFeesDiscount(id) {
    return this.http.post('/api/FeesDiscount/DeleteFeesDiscount', id);
  }
  updateFeesDiscount(data) {
    return this.http.post('/api/FeesDiscount/UpdateFeesDiscount', data);
  }


}

