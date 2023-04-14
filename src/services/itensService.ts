import { db } from "../../server";
import { CreateItem, ITag } from "../interfaces";
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

  public async verifyRoom(tags: string[], antenna: string) {
    try {
      const promises = [];
      db.execute();
      for(var tag of tags) {
        promises.push(new Promise<ITag>(async (resolve, reject) => {
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

          resolve({
            tag,
            antenna,
            result
          });
        }));
      }

        const resultPromise: ITag[] = await Promise.all(promises);

        const result = resultPromise.map(r => {
          if(r.result.length > 0) {
            return {
              data: {
                status: true,
                data: r
              }
            }
          } else {
            return {
              data: {
                status: false,
                data: r
              }
            }
          }
        });
        
        const unauthorized = result.filter(r => r.data.status == false).length > 0;

        if(unauthorized) {
          return {
            status: 200,
            data: {
              status: false,
              data: result
            }
          }
        }

        return {
          status: 200,
          data: {
            status: true,
            data: result
          }
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

  public async getByTag(tags: string[]) {
    try {
      const promises = [];

      for(var tag of tags) {
        promises.push(new Promise(async (resolve, reject) => {
          const result = await itens.findOne({ tag: tag });
          resolve(result);
        }));
      }

      const response = await Promise.all(promises);

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
