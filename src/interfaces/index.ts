export interface CreateRoom {
  name: string;
  id: string;
  antenna: Array<Antenna>;
  createdAt: string;
}

export interface CreateItem {
  name: string;
  tag: string;
  id: string;
  rooms: Array<RoomID>;
  createdAt: string;
}
export interface Antenna {
  id: string;
}

export interface RoomID {
  id: string;
}

export interface IResponse {
  status?: number;
  message?: string;
  data?: any;
}
