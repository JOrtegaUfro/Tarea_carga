import mongoose from "mongoose";
import { MONGO_URI } from "./enviorment.js";

export default function connectDB() {
    return mongoose
        .connect(MONGO_URI)
        .then((success) => {
            console.log("MongoDB se a conectado correctamente");
            return true;
        })
        .catch((error) => {
            console.log(`MongoDB no se conecto, error: ${error}`);
            return false;
        });
}


async function registerModels() {
    await import("./models/games.model.js");
}