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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailJob = void 0;
const node_cron_1 = __importDefault(require("node-cron"));
const incident_model_1 = require("../../data/models/incident.model");
const email_service_1 = require("../services/email.service");
const email_tempate_1 = require("../templates/email.tempate");
const emailJob = () => {
    const emailService = new email_service_1.EmailService();
    node_cron_1.default.schedule(" */10 * * * * *", () => __awaiter(void 0, void 0, void 0, function* () {
        console.log("Ejecucion cada 10s...");
        try {
            const incidents = yield incident_model_1.IncidentModel.find({ isEmailSent: false });
            if (!incidents.length) {
                console.log("No hay incidentes pendientes por enviar");
                return;
            }
            console.log(`Procesando ${incidents.length}`);
            yield Promise.all(incidents.map((incident) => __awaiter(void 0, void 0, void 0, function* () {
                try {
                    const htmlBody = (0, email_tempate_1.generateIncidentEmailTemplate)(incident.title, incident.description, incident.lat, incident.lng);
                    yield emailService.sendEmail({
                        to: "ashliac.aam@gmail.com",
                        subject: `Incidente: ${incident.title}`,
                        htmlBody: htmlBody
                    });
                    console.log(`Email enviado para el incidente con Id: ${incident._id}`);
                    let updateIncident = {
                        title: incident.title,
                        description: incident.description,
                        lat: incident.lat,
                        lng: incident.lng,
                        isEmailSent: true
                    };
                    yield incident_model_1.IncidentModel.findByIdAndDelete(incident._id, updateIncident);
                    console.log(`Incidente actualizado para el Id: ${incident._id}`);
                }
                catch (error) {
                    console.error("Error al procesar el incidente");
                }
            })));
        }
        catch (error) {
            console.error("Error durante el envio de correos");
        }
    }));
};
exports.emailJob = emailJob;
