"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isWithinOperatingHours = isWithinOperatingHours;
const dayjs_1 = __importDefault(require("dayjs"));
function isWithinOperatingHours() {
    const now = (0, dayjs_1.default)();
    const hour = now.hour();
    return hour >= 12 && hour < 20;
}
