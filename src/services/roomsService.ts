import { CreateRoom } from "../interfaces";
import rooms from "../models/room";

class roomService {
  public async createRoom(data: CreateRoom) {
    try {
      let room = new rooms(data);

      const result = await room.save();

      if (result) {
        return {
          status: 201,
          message: "Sala criada com sucesso",
        };
      } else {
        return {
          status: 500,
        };
      }
    } catch (err: any) {
      return {
        status: err.status || 500,
        message: err.message,
      };
    }
  }
}

export default roomService;
