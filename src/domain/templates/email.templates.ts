import { envs } from "../../config/envs.plugin";

export function generateCaseEmailTemplate(name: string, lastname:string, genre: string, age: number, lat: number, lng: number): string {
    const mapboxUrl = generateMapboxStaticImageURL(lat, lng);
    return `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Case Details</title>
    <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                color: #333;
                margin: 0;
                padding: 0;
            }
            .container {
                width: 100%;
                max-width: 600px;
                margin: 20px auto;
                background-color: #ffffff;
                border-radius: 8px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                overflow: hidden;
            }
            .header {
                background-color: #007BFF;
                color: #ffffff;
                padding: 20px;
                text-align: center;
            }
            .header h1 {
                margin: 0;
                font-size: 24px;
            }
            .content {
                padding: 20px;
            }
            .content p {
                margin: 10px 0;
            }
            .footer {
                background-color: #f4f4f4;
                color: #777;
                padding: 10px;
                text-align: center;
                font-size: 12px;
            }
            .map-img{
                width:100%;
                height: auto;
                border-radius: 10px;
            }
        </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Case Details</h1>
        </div>
        <div class="content">
            <div class="detail-group">
                <h2>Person Information</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Lastname:</strong> ${lastname}</p>
                <p><strong>Genre:</strong> ${genre}</p>
                <p><strong>Age:</strong> ${age}</p>
            </div>
            <div class="detail-group">
                <h2>Incident Information</h2>
                <p><strong>Latitude:</strong> ${lat}</p>
                <p><strong>Longitude:</strong> ${lng}</p>
            </div>
            <img src="${mapboxUrl}" alt="Map Location" class="map-img">
        </div>
        <div class="footer">
            <p>This is an automatically generated email. Please do not reply.</p>
            <p class="footer-title">Monkeypox Incidents</p>
        </div>
    </div>
</body>
</html>


    
    `;
}


export const generateMapboxStaticImageURL= (lat:number, lng:number) =>{
    const accessToken = envs.MAPBOX_ACCESS_TOKEN; // Reemplaza con tu token de acceso de Mapbox
    const zoom = 15; // Nivel de zoom
    const width = 800; // Ancho de la imagen
    const height = 500; // Altura de la imagen
 
    return `https://api.mapbox.com/styles/v1/mapbox/light-v11/static/pin-l-embassy+f74e4e(${lng},${lat})/${lng},${lat},${zoom}/${width}x${height}?access_token=${accessToken}`;
}