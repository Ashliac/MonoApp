import {Request, Response} from 'express';
import { IncidentModel } from '../../../data/models/incident.model';
import { EmailService } from '../../../domain/services/email.service';

export class IncidentController {

    public getIncidents = async (req: Request, res: Response) => {
        //res.send("Obteniendo los datos");
        try{
            const incidents = await IncidentModel.find();
            console.log(incidents)
            return res.json(incidents);
        } catch(error){
            console.error(error)
            return res.json([]);
        }
    }

    //aam75237@lasallebajio.edu.mx
    public createIncident = async (req: Request, res: Response) => {
        try {

            const { title, description, lat, lng } = req.body;
            const newIncident = await IncidentModel.create({
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
        } catch (error) {
            res.json({ message: "Error creando registro" });
        }
    };

    public getIncidentById = async (req: Request, res: Response) => {
        try{
            const { id } = req.params;
            const incident = await IncidentModel.findById(id);
            return res.json(incident);

        } catch(error) {
            return res.json({message:"Ocurrio un error al traer el inicente"});
        }
    }

    public updateIncident = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const { title, description, lat, lng } = req.body;
            await IncidentModel.findByIdAndUpdate(id, {
                title,
                description,
                lat,
                lng
            }
            );
            const updateIncident = await IncidentModel.findById(id)
            return res.json(updateIncident)


        } catch (error) {
            return res.json({ message: "Ocurrio un error al actualizar el incidente" })
        }
    }

    public deleteIncident = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            await IncidentModel.findByIdAndDelete(id)
            const deleteIncident = await IncidentModel.findById(id)
            return res.json(deleteIncident)
        } catch (error) {
            return res.json({ message: "Ocurrio un error al eliminar el incidente" })
        }
    }
}