import { CreateItem } from "../../../interfaces";
import itemService from "../../../services/itensService";

export class CreateItemUseCase {
    constructor(
        private service: itemService
    ){}

    async call(data: CreateItem) {
        return await this.service.createItem(data);
    }
}