import { Router, Request, Response } from "express";
import { IResponse } from "../interfaces";
import { Responses } from "../utils";
import { v4 } from "uuid";
import roomService from "../services/roomsService";

const router = Router();

const room = new roomService();

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

router.get('/', (req: Request, res: Response) => {

});

export { router as routerRoom }