import { HttpRequest, HttpResponse } from "./protocols";

//Guest
export interface Guest {
  id: string;
  guestName: string;
}

export interface CreateGuestParams {
  guestName: string;
}

export interface ICreateGuest {
  createGuest(params: CreateGuestParams): Promise<Guest>;
}

// Controller
export interface ICreateGuestController {
  handle(
    httpRequest: HttpRequest<CreateGuestParams>
  ): Promise<HttpResponse<Guest>>;
}

export interface IGetGuestsController {
  handle(): Promise<HttpResponse<Guest[]>>;
}

// Repository
export interface ICreateGuestRepository {
  createGuest(params: CreateGuestParams): Promise<Guest>;
}
export interface IGetGuestsRepository {
  getGuests(): Promise<Guest[]>;
}
