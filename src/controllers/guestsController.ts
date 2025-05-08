import {
  CreateGuestParams,
  Guest,
  ICreateGuestController,
  ICreateGuestRepository,
  IGetGuestsController,
  IGetGuestsRepository,
} from "../interfaces/guestsInterface";
import { HttpRequest, HttpResponse } from "../interfaces/protocols";

//Get
export class GetGuestsController implements IGetGuestsController {
  constructor(private readonly getGuestsRepository: IGetGuestsRepository) {}

  async handle() {
    try {
      const guests = await this.getGuestsRepository.getGuests();

      return {
        statusCode: 200,
        body: guests,
      };
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return {
        statusCode: 500,
        body: "Something went wrong.",
      };
    }
  }
}

//Post
export class CreateGuestController implements ICreateGuestController {
  constructor(private readonly createGuestRepository: ICreateGuestRepository) {}

  async handle(
    httpRequest: HttpRequest<CreateGuestParams>
  ): Promise<HttpResponse<Guest>> {
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
    } catch (error) {
      if (error instanceof Error && error.message.includes("already exists")) {
        return {
          statusCode: 400,
          body: error.message,
        };
      }

      return {
        statusCode: 500,
        body: "Something went wrong.",
      };
    }
  }
}
