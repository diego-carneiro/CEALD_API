"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const guestsController_1 = require("../controllers/guestsController");
const guestsRepository_1 = require("../repositories/guestsRepository");
const isWithinOperatingHours_1 = require("../utils/isWithinOperatingHours");
const router = (0, express_1.Router)();
// GET /guestList
router.get("/guestList", async (req, res) => {
    const getGuestsRepository = new guestsRepository_1.GetGuestsRepository();
    const getGuestsController = new guestsController_1.GetGuestsController(getGuestsRepository);
    const { body, statusCode } = await getGuestsController.handle();
    res.status(statusCode).send(body);
});
// POST /guest
router.post("/guest", async (req, res) => {
    const createGuestRepository = new guestsRepository_1.CreateGuestRepository();
    const createGuestController = new guestsController_1.CreateGuestController(createGuestRepository);
    const { body, statusCode } = await createGuestController.handle({
        body: req.body,
    });
    res.status(statusCode).send(body);
});
// GET /is-open
router.get("/is-open", (req, res) => {
    const isOpen = (0, isWithinOperatingHours_1.isWithinOperatingHours)();
    res.status(200).json({ isOpen });
});
exports.default = router;
