import { Injectable } from '@angular/core';
import { HttpServiceService } from '../common/http-service.service';

@Injectable({
  providedIn: 'root'
})
export class InstituteService {
  constructor(private http: HttpServiceService) { }

  //create Institute

  createInstitute(data) {
    return this.http.post('/api/MstInstitute/InsertMstInstitute', data);
  }

  getInstituteById(id) {
    return this.http.get('/api/MstInstitute/MstInstituteById?id=' + id);
  }
  getAllInstitute() {
    return this.http.get('/api/MstInstitute/GetAllMstInstitute');
  }
  deleteInstitute(id) {
    return this.http.post('/api/MstInstitute/DeleteMstInstitute', id);
  }
  updateInstitute(data) {
    return this.http.post('/api/MstInstitute/UpdateMstInstitute', data);
  }
}