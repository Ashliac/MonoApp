import mongoose from "mongoose"; // Te permite conectar mongo con node

interface ConnectionOptions{
    mongoUrl: string,
    dbName: string
}

export class MongoDatabase{
    static async connect(options:ConnectionOptions){
        try{
            await mongoose.connect(options.mongoUrl,{
                dbName:options.dbName
            });
            console.log("Connected to the database");
        }
        catch(error){
            console.log("Error conecting to the database");
        }
    }
}