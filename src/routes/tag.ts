import { Router, Request, Response } from "express";
import itemService from "../services/itensService";
import { playAudio, Responses } from "../utils";
import socket from "../socket";
import { IResponse } from "../interfaces";
import { itemController } from ".";

const router = Router();

const item = new itemService();

router.get("/by_tag", async (req: Request, res: Response) => {
  itemController.findByTag(req, res);
});

router.get("/", async (req: Request, res: Response) => {
  const { tags, antenna } = req.body;

  console.log('Verificação de quarto: ', tags);

  const result = await item.verifyRoom(tags, antenna);

  Responses(res, result.status, result.message, result.data);

  const permission = result.data?.status;

  const authorized = result.data?.data.filter(data => data.data.status == true);
  console.log(authorized);

  if (!permission) {
    socket.sendMessage("Alarm", {
      title: "Falha de Permissão",
      message: "Tag fora da área permitida. Favor verificar.",
      object: result.data?.data,
    });
    playAudio("../../assets/audio/pega_ladrao.mp3");
  } else {
    if(authorized?.length == 1) {
      const itemTag = authorized[0].data.data.tag;
      const isBaby = (await item.isBaby(itemTag)).data?.status;
      if(isBaby) {
        console.log('Bebê: ', itemTag, isBaby);
        playAudio("../../assets/audio/baby.mp3");

        socket.sendMessage("Alarm", {
          title: "Bebê Sozinho",
          message: "Bebê está sozinho no quarto",
          object: result.data?.data
        })
      }
    }
  }

  socket.sendMessage("Tag", {
    title: "Localização da Tag",
    object: result.data?.data,
  });
});

export { router as routerTag };
