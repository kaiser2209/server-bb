import { Router, Request, Response } from "express";
import itemService from "../services/itensService";
import { playAudio, Responses } from "../utils";
import socket from "../socket";
import { IResponse } from "../interfaces";

const router = Router();

const item = new itemService();

router.get("/by_tag", async (req: Request, res: Response) => {
  const { tags } = req.body;

  const result = await item.getByTag(tags);

  Responses(res, result.status, result.message, result.data);
});

router.get("/", async (req: Request, res: Response) => {
  const { tags, antenna } = req.body;

  const result = await item.verifyRoom(tags, antenna);

  Responses(res, result.status, result.message, result.data);

  const permission = result.data?.status;

  if (!permission) {
    socket.sendMessage("Alarm", {
      title: "Falha de Permissão",
      message: "Tag fora da área permitida. Favor verificar.",
      object: result.data?.data,
    });
    playAudio("../../assets/audio/pega_ladrao.mp3");
  }

  socket.sendMessage("Tag", {
    title: "Localização da Tag",
    object: result.data?.data,
  });
});

export { router as routerTag };
