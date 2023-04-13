import { Router, Response } from "express";
import { routerItem } from "./item";
import { routerTag } from "./tag";
import { routerRoom } from "./room";

const router = Router();

router.get('/status', (_, res: Response) => {
    return res.send('Server is up and running healthy!');
});

router.use('/item', routerItem);
router.use('/room', routerRoom);
router.use('/tag', routerTag);

export default router;