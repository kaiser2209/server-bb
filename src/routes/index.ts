import { Router, Response } from "express";
import { routerItem } from "./item";

const router = Router();

router.get('/status', (_, res: Response) => {
    return res.send('Server is up and running healthy!');
});

router.use('/item', routerItem);

export default router;