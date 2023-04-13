import { Router, Request, Response } from "express";
import itemService from "../services/itensService";
import { Responses } from "../utils";

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
});

export { router as routerTag }