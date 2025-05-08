import { Router } from "express";
import {
  CreateGuestController,
  GetGuestsController,
} from "../controllers/guestsController";
import {
  CreateGuestRepository,
  GetGuestsRepository,
} from "../repositories/guestsRepository";

const router = Router();

router.get("/guestList", async (req, res) => {
  const getGuestsRepository = new GetGuestsRepository();
  const getGuestsController = new GetGuestsController(getGuestsRepository);

  const { body, statusCode } = await getGuestsController.handle();

  res.status(statusCode).send(body);
});

router.post("/guest", async (req, res) => {
  const createGuestRepository = new CreateGuestRepository();
  const createGuestController = new CreateGuestController(
    createGuestRepository
  );

  const { body, statusCode } = await createGuestController.handle({
    body: req.body,
  });

  res.status(statusCode).send(body);
});

export default router;
