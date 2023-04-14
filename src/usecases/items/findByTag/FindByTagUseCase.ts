import itemService from "../../../services/itensService";

export class FindByTagUseCase {
    constructor(
        private service: itemService
    ){}

    async call(tag: string[]) {
        return await this.service.getByTag(tag);
    }
}