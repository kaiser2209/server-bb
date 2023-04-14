import itemService from "../../services/itensService";
import { CreateItemUseCase } from "./create/CreateItemUseCase";
import { FindAllItensUseCase } from "./findAll/FindAllItensUseCase";
import { FindByTagUseCase } from "./findByTag/FindByTagUseCase";
const service = new itemService();
const createItemUseCase = new CreateItemUseCase(service);
const findAllItensUseCase = new FindAllItensUseCase(service);
const findByTagUseCase = new FindByTagUseCase(service);

export {
    createItemUseCase,
    findAllItensUseCase,
    findByTagUseCase
}