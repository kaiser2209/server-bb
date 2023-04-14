import { Request, Response, Router, response } from "express";
import itemService from "../services/itensService";
import roomService from "../services/roomsService";
import { v4 } from 'uuid';
import { Responses } from "../utils";
import { IResponse } from "../interfaces";
import { ItemController } from "../controllers/ItemController";
import { createItemUseCase, findAllItensUseCase, findByTagUseCase } from "../usecases/items";
import { itemController } from ".";

const router = Router();

router.post('/create_item', async (req: Request, res: Response) => {
    itemController.create(req, res);
});

router.get('/', async (req: Request, res: Response) => {
    itemController.findAll(req, res);
});

export { router as routerItem }