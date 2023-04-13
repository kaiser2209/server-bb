import { CreateRoom } from "../interfaces";
import itens from "../models/item";

class itemService {
  public async createItem(data: CreateRoom) {
    try {
      let item = new itens(data);

      const result = await item.save();

      if (result) {
        return {
          status: 201,
          message: "Item criado com sucesso",
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

export default itemService;
