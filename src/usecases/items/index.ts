import itemService from "../../services/itensService";
import { CreateItemUseCase } from "./create/CreateItemUseCase";
import { FindAllItensUseCase } from "./findAll/FindAllItensUseCase";
const service = new itemService();
const createItemUseCase = new CreateItemUseCase(service);
const findAllItensUseCase = new FindAllItensUseCase(service);

export {
    createItemUseCase,
    findAllItensUseCase
}