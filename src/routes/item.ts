import { Request, Response, Router, response } from "express";
import itemService from "../services/itensService";
import roomService from "../services/roomsService";
import { v4 } from 'uuid';
import { Responses } from "../utils";
import { IResponse } from "../interfaces";
import { ItemController } from "../controllers/ItemController";
import { createItemUseCase, findAllItensUseCase } from "../usecases/items";

const router = Router();

const controller = new ItemController(
    createItemUseCase,
    findAllItensUseCase
    );

router.post('/create_item', async (req: Request, res: Response) => {
    controller.create(req, res);
});

router.get('/', async (req: Request, res: Response) => {
    controller.findAll(req, res);
});

export { router as routerItem }