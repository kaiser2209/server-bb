import itemService from "../../../services/itensService";

export class verifyRoomUseCase {
    constructor(
        private service: itemService
    ){}

    async call(tags: string[], antenna: string) {
        this.service.verifyRoom(tags, antenna);
    }
}