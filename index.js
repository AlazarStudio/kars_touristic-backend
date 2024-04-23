import express from "express";
import mongoose from "mongoose";
import router from "./router.js";
import fileUpload from "express-fileupload";
import cors from "cors"

const PORT = process.env.PORT ||  5002
const DB_URL = 'mongodb://localhost:27017/kars_touristic_DB'; 

const app = express();

app.use(express.json());
app.use('/api', express.static('static'));
app.use(fileUpload({}));
app.use(cors());
app.use('/api', router);

async function startApp() {
    try {
        await mongoose.connect(DB_URL, {useUnifiedTopology: true, useNewUrlParser: true})
        app.listen(PORT, () => console.log(`Server working on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

startApp()
