import { Router } from "express";
import {
  CreateGuestController,
  GetGuestsController,
} from "../controllers/guestsController";
import {
  CreateGuestRepository,
  GetGuestsRepository,
} from "../repositories/guestsRepository";
import { isWithinOperatingHours } from "../utils/isWithinOperatingHours";

const router = Router();

// GET /guestList
router.get("/guestList", async (req, res) => {
  const getGuestsRepository = new GetGuestsRepository();
  const getGuestsController = new GetGuestsController(getGuestsRepository);

  const { body, statusCode } = await getGuestsController.handle();

  res.status(statusCode).send(body);
});

// POST /guest
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

// GET /is-open

router.get("/is-open", (req, res): void => {
  const isOpen: boolean = isWithinOperatingHours();

  res.status(200).json({ isOpen });
});

export default router;
