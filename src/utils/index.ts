import { Response } from "express";

import player from "play-sound";

export function Responses(
  res: Response,
  status?: number | undefined,
  message?: string,
  data?: object
) {
  let response: object = {};
  if (status === 500) {
    response = {
      message: message ? message : "Erro interno de servidor",
      data: data,
    };
  } else if (status === 401) {
    response = {
      message: message ? message : "Acesso não autorizado",
      data: data,
    };
  } else {
    response = {
      message: message,
      data: data,
    };
  }
  return res.status(status ? status : 500).json(response);
}

export function playAudio() {
  const audioMp3 = "../assets/audio/pega_ladrao.mp3";
  player().play(audioMp3, (err) => {
    if (err) console.log(`Erro ao tocar áudio: ${err}`);
  });
}
