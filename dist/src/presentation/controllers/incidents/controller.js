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
exports.IncidentController = void 0;
const incident_model_1 = require("../../../data/models/incident.model");
class IncidentController {
    constructor() {
        this.getIncidents = (req, res) => __awaiter(this, void 0, void 0, function* () {
            //res.send("Obteniendo los datos");
            try {
                const incidents = yield incident_model_1.IncidentModel.find();
                console.log(incidents);
                return res.json(incidents);
            }
            catch (error) {
                console.error(error);
                return res.json([]);
            }
        });
        //aam75237@lasallebajio.edu.mx
        this.createIncident = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { title, description, lat, lng } = req.body;
                const newIncident = yield incident_model_1.IncidentModel.create({
                    title,
                    description,
                    lat,
                    lng,
                });
                // const emailService = new EmailService();
                // await emailService.sendEmail({
                //     to: "ashliac.aam@gmail.com",
                //     subject:`Incidente: ${newIncident.title} `,
                //     htmlBody:  `<h1>${newIncident.description}</h1> `
                // })
                res.json(newIncident);
            }
            catch (error) {
                res.json({ message: "Error creando registro" });
            }
        });
        this.getIncidentById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const incident = yield incident_model_1.IncidentModel.findById(id);
                return res.json(incident);
            }
            catch (error) {
                return res.json({ message: "Ocurrio un error al traer el inicente" });
            }
        });
        this.updateIncident = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { title, description, lat, lng } = req.body;
                yield incident_model_1.IncidentModel.findByIdAndUpdate(id, {
                    title,
                    description,
                    lat,
                    lng
                });
                const updateIncident = yield incident_model_1.IncidentModel.findById(id);
                return res.json(updateIncident);
            }
            catch (error) {
                return res.json({ message: "Ocurrio un error al actualizar el incidente" });
            }
        });
        this.deleteIncident = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield incident_model_1.IncidentModel.findByIdAndDelete(id);
                const deleteIncident = yield incident_model_1.IncidentModel.findById(id);
                return res.json(deleteIncident);
            }
            catch (error) {
                return res.json({ message: "Ocurrio un error al eliminar el incidente" });
            }
        });
    }
}
exports.IncidentController = IncidentController;
