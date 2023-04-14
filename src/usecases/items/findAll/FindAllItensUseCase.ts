import itemService from "../../../services/itensService";

export class FindAllItensUseCase {
    constructor(
        private service: itemService
    ){}

    async call() {
        return await this.service.getItens();
    }
}