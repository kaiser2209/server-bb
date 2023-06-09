import { Request, Response } from "express";
import itemService from "../services/itensService";
import { IResponse } from "../interfaces";
import { Responses } from "../utils";
import { v4 } from "uuid";
import { CreateItemUseCase } from "../usecases/items/create/CreateItemUseCase";
import { FindAllItensUseCase } from "../usecases/items/findAll/FindAllItensUseCase";
import { FindByTagUseCase } from "../usecases/items/findByTag/FindByTagUseCase";

export class ItemController {
    constructor(
        private createUseCase: CreateItemUseCase,
        private findAllUseCase: FindAllItensUseCase,
        private findByTagUseCase: FindByTagUseCase
    ){}

    async create(req: Request, res: Response) {
        const { name, tag, rooms } = req.body;

        const result: IResponse = await this.createUseCase.call({
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
        
    }

    async findAll(req: Request, res: Response) {
        const result: IResponse = await this.findAllUseCase.call();

        Responses(
            res,
            result.status,
            result.message,
            result.data
        )
    }

    async findByTag(req: Request, res: Response) {
        const { tags } = req.body;

        const result = await this.findByTagUseCase.call(tags);

        Responses(res, result.status, result.message, result.data);
    }
}