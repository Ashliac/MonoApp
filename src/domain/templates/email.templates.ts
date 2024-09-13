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
            font-family: 'Arial', sans-serif;
            background-color: #e0f7fa;
            color: #0277bd;
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
            background-color: #01579b;
            color: #ffffff;
            padding: 20px;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            font-size: 28px;
            font-weight: bold;
        }
        .header h2 {
            margin: 10px 0 0;
            font-size: 20px;
        }
        .content {
            padding: 20px;
        }
        .content p {
            margin: 10px 0;
        }
        .footer {
            background-color: #b3e5fc;
            color: #01579b;
            padding: 10px;
            text-align: center;
            font-size: 12px;
        }
        .map-img {
            width: 100%;
            height: auto;
            border-radius: 10px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Monkeypox</h1>
            <h2>Case Details</h2>
        </div>
        <div class="content">
            <div class="detail-group">
                <h3>Person Information</h3>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Lastname:</strong> ${lastname}</p>
                <p><strong>Genre:</strong> ${genre}</p>
                <p><strong>Age:</strong> ${age}</p>
            </div>
            <div class="detail-group">
                <h3>Incident Information</h3>
                <p><strong>Latitude:</strong> ${lat}</p>
                <p><strong>Longitude:</strong> ${lng}</p>
            </div>
            <img src="${mapboxUrl}" alt="Map Location" class="map-img">
        </div>
        <div class="footer">
            <p>This is an automatically generated email. Please do not reply.</p>
            <p>Monkeypox Incidents</p>
        </div>
    </div>
</body>
</html>
    `;
}

export const generateMapboxStaticImageURL = (lat: number, lng: number) => {
    const accessToken = envs.MAPBOX_ACCESS_TOKEN; // Replace with your Mapbox access token
    const zoom = 15; // Zoom level
    const width = 800; // Image width
    const height = 500; // Image height

    return `https://api.mapbox.com/styles/v1/mapbox/light-v11/static/pin-l-embassy+f74e4e(${lng},${lat})/${lng},${lat},${zoom}/${width}x${height}?access_token=${accessToken}`;
}
