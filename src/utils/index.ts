import { Response } from "express";

import player from "play-sound";

var playTimer: number | null;
let isPlaying = false;

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

export function playAudio(audioMp3: string) {
  if (!isPlaying) {
    isPlaying = true;
    player().play(audioMp3, (err) => {
      if (err) console.log(`Erro ao tocar áudio: ${err}`);
      isPlaying = false;
    });
  }
}
