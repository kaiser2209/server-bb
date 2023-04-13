import { Router, Request, Response } from "express";
import itemService from "../services/itensService";
import { Responses } from "../utils";
import socket from "../socket";
import { IResponse } from "../interfaces";

const router = Router();

const item = new itemService();

router.get('/', async (req: Request, res: Response) => {
    const { tag, antenna } = req.body;

    const result = await item.verifyRoom(tag, antenna);

    Responses(
        res,
        result.status,
        result.message,
        result.data
    );

    const permission = result.data?.status;

    if(!permission) {
        socket.sendMessage('Alarm', {
            title: 'Falha de Permissão',
            message: 'Tag fora da área permitida. Favor verificar.',
            object: result.data?.result
        })
    }

    socket.sendMessage('Tag', {
        title: 'Localização da Tag',
        object: result.data?.result
    })
});

router.get('/by_tag', async (req: Request, res: Response) => {
    const { tags } = req.body;

    const result: IResponse = await item.getByTag(tags);

    Responses(
        res,
        result.status,
        result.message,
        result.data
    )
});

export { router as routerTag }