"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IncidentModel = void 0;
const mongoose_1 = __importDefault(require("mongoose")); // Te permite conectar mongo con node
const incidentSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    lat: {
        type: Number,
        required: true,
    },
    lng: {
        type: Number,
        required: true
    },
    isEmailSent: {
        type: Boolean,
        default: false
    }
});
exports.IncidentModel = mongoose_1.default.model("incidents", incidentSchema);
