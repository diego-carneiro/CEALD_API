"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateGuestController = exports.GetGuestsController = void 0;
//Get
class GetGuestsController {
    constructor(getGuestsRepository) {
        this.getGuestsRepository = getGuestsRepository;
    }
    handle() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const guests = yield this.getGuestsRepository.getGuests();
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
        });
    }
}
exports.GetGuestsController = GetGuestsController;
//Post
class CreateGuestController {
    constructor(createGuestRepository) {
        this.createGuestRepository = createGuestRepository;
    }
    handle(httpRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!httpRequest.body) {
                    return {
                        statusCode: 400,
                        body: "Missing body",
                    };
                }
                const { body } = httpRequest;
                const guest = yield this.createGuestRepository.createGuest(body);
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
        });
    }
}
exports.CreateGuestController = CreateGuestController;
