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

router.post('/create_room', async (req: Request, res: Response) => {
    const { name, antenna } = req.body;

    const result: IResponse = await room.createRoom({
        name,
        antenna,
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

router.get('/verify_room', (req: Request, res: Response) => {

});

export { router as routerItem }