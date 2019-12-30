import { Injectable } from '@angular/core';
import { HttpServiceService } from '../common/http-service.service';

@Injectable({
  providedIn: 'root'
})
export class RoomTypeService {
  constructor(private http: HttpServiceService) { }

  //create RoomType

  createRoomType(data) {
    return this.http.post('/api/MstRoomType/InsertMstRoomType', data);
  }

  getRoomTypeById(id) {
    return this.http.get('/api/MstRoomType/GetByIdMstRoomType?id=' + id);
  }
  getAllRoomTypes() {
    return this.http.get('/api/MstRoomType/GetMstRoomType');
  }
  deleteRoomType(id) {
    return this.http.post('/api/MstRoomType/DeleteMstRoomType', id);
  }
  updateRoomType(data) {
    return this.http.post('/api/MstRoomType/UpdateMstRoomType', data);
  }
}