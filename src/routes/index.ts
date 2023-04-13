import { Router, Response } from "express";

const router = Router();

router.get('/status', (_, res: Response) => {
    return res.send('Server is up and running healthy!');
});

export default router;