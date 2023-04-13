import { Request, Response, Router, response } from "express";
import itemService from "../services/itensService";
import roomService from "../services/roomsService";
import { v4 } from 'uuid';
import { Responses } from "../utils";
import { IResponse } from "../interfaces";

const router = Router();

const item = new itemService();
const room = new roomService();

router.post('/create_item', async (req: Request, res: Response) => {
    const { name, tag, rooms } = req.body;

    const result: IResponse = await item.createItem({
        name,
        tag,
        rooms,
        id: v4(),
        createdAt: (new Date()).toISOString()
    });

    Responses(
        res,
        result.status,
        result.message,
        result.data
    )
});

router.get('/', async (req: Request, res: Response) => {
    const result: IResponse = await item.getItens();

    Responses(
        res,
        result.status,
        result.message,
        result.data
    )
});

export { router as routerItem }