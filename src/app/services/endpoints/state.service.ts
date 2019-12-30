import { Injectable } from '@angular/core';
import { HttpServiceService } from '../common/http-service.service';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  constructor(private http: HttpServiceService) { }

  //create State

  createState(data) {
    return this.http.post('/api/MstState/InsertMstState', data);
  }

  getStateById(id) {
    return this.http.get('/api/MstState/GetByIdMstState?id=' + id);
  }
  getAllState() {
    return this.http.get('/api/MstState/GetMstState');
  }
  deleteState(id) {
    return this.http.post('/api/MstState/DeleteMstState', id);
  }
  updateState(data) {
    return this.http.post('/api/MstState/UpdateMstState', data);
  }
}