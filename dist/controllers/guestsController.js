"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateGuestController = exports.GetGuestsController = void 0;
//Get
class GetGuestsController {
    constructor(getGuestsRepository) {
        this.getGuestsRepository = getGuestsRepository;
    }
    async handle() {
        try {
            const guests = await this.getGuestsRepository.getGuests();
            return {
                statusCode: 200,
                body: guests,
            };
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        }
        catch (error) {
            return {
                statusCode: 500,
                body: "Something went wrong.",
            };
        }
    }
}
exports.GetGuestsController = GetGuestsController;
//Post
class CreateGuestController {
    constructor(createGuestRepository) {
        this.createGuestRepository = createGuestRepository;
    }
    async handle(httpRequest) {
        try {
            if (!httpRequest.body) {
                return {
                    statusCode: 400,
                    body: "Missing body",
                };
            }
            const { body } = httpRequest;
            const guest = await this.createGuestRepository.createGuest(body);
            return {
                statusCode: 201,
                body: guest,
            };
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        }
        catch (error) {
            return {
                statusCode: 500,
                body: "Something went wrong.",
            };
        }
    }
}
exports.CreateGuestController = CreateGuestController;
