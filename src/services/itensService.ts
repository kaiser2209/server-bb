import { db } from "../../server";
import { CreateItem } from "../interfaces";
import itens from "../models/item";

class itemService {
  public async createItem(data: CreateItem) {
    try {
      db.execute();
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

  public async verifyRoom(tag: string, antenna: string) {
    try {
      db.execute();
      const result = await itens.aggregate([
        {
          $match: {
            tag: tag,
          },
        },
        {
          $unwind: {
            path: "$rooms",
          },
        },
        {
          $match: {
            "rooms.id": antenna,
          },
        },
      ]);

      if (result.length > 0) {
        return {
          status: 200,
          data: {
            status: true,
            result,
          },
        };
      } else {
        return {
          status: 200,
          data: {
            status: false,
          },
        };
      }
    } catch (err: any) {
      return {
        status: err.status || 500,
        message: err.message,
      };
    }
  }

  public async getItens() {
    try {
      const response = await itens.find();

      if (response) {
        return {
          status: 200,
          data: response,
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

  public async getByTag(tag: string) {
    try {
      const response = await itens.find({ tag: tag });

      if (response) {
        return {
          status: 200,
          data: response,
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
