"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IncidentRoutes = void 0;
const express_1 = require("express");
const controller_1 = require("./controller");
class IncidentRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const controller = new controller_1.IncidentController();
        router.get("/", controller.getIncidents);
        router.get("/:id", controller.getIncidentById);
        router.post("/", controller.createIncident);
        router.put("/:id", controller.updateIncident);
        router.delete("/:id", controller.deleteIncident);
        return router;
    }
}
exports.IncidentRoutes = IncidentRoutes;
