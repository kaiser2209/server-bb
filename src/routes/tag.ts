import { Router, Request, Response } from "express";
import itemService from "../services/itensService";
import { playAudio, Responses } from "../utils";
import socket from "../socket";

const router = Router();

const item = new itemService();

router.get("/", async (req: Request, res: Response) => {
  const { tag, antenna } = req.body;

  const result = await item.verifyRoom(tag, antenna);

  Responses(res, result.status, result.message, result.data);

  const permission = result.data?.status;

  if (!permission) {
    socket.sendMessage("Alarm", {
      title: "Falha de Permissão",
      message: "Tag fora da área permitida. Favor verificar.",
      object: result.data?.result,
    });
    playAudio();
  }

  socket.sendMessage("Tag", {
    title: "Localização da Tag",
    object: result.data?.result,
  });
});

export { router as routerTag };
