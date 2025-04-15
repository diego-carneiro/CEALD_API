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
const express_1 = require("express");
const guestsController_1 = require("../controllers/guestsController");
const guestsRepository_1 = require("../repositories/guestsRepository");
const isWithinOperatingHours_1 = require("../utils/isWithinOperatingHours");
const router = (0, express_1.Router)();
// GET /guestList
router.get("/guestList", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const getGuestsRepository = new guestsRepository_1.GetGuestsRepository();
    const getGuestsController = new guestsController_1.GetGuestsController(getGuestsRepository);
    const { body, statusCode } = yield getGuestsController.handle();
    res.status(statusCode).send(body);
}));
// POST /guest
router.post("/guest", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const createGuestRepository = new guestsRepository_1.CreateGuestRepository();
    const createGuestController = new guestsController_1.CreateGuestController(createGuestRepository);
    const { body, statusCode } = yield createGuestController.handle({
        body: req.body,
    });
    res.status(statusCode).send(body);
}));
// GET /is-open
router.get("/is-open", (req, res) => {
    const isOpen = (0, isWithinOperatingHours_1.isWithinOperatingHours)();
    res.status(200).json({ isOpen });
});
exports.default = router;
