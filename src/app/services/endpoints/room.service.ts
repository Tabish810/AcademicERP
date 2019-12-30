import { Injectable } from '@angular/core';
import { HttpServiceService } from '../common/http-service.service';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  constructor(private http: HttpServiceService) { }

  //create Room

  createRoom(data) {
    return this.http.post('/api/MstHouseRoom/InsertMstHouseRoom', data);
  }

  getRoomById(id) {
    return this.http.get('/api/MstHouseRoom/GetByIdMstHouseRoom?id=' + id);
  }
  getAllRooms() {
    return this.http.get('/api/MstHouseRoom/GetMstHouseRoom');
  }
  deleteRoom(id) {
    return this.http.post('/api/MstHouseRoom/DeleteMstHouseRoom', id);
  }
  updateRoom(data) {
    return this.http.post('/api/MstHouseRoom/UpdateMstHouseRoom', data);
  }
}