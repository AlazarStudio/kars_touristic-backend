import express from "express";
import mongoose from "mongoose";

import router from "./router.js";

import cors from "cors"

const PORT = process.env.PORT || 5002
// const DB_URL = 'mongodb://127.0.0.1:27017/test';
const DB_URL = 'mongodb://127.0.0.1:27017/kars_touristic_DB';

const app = express();

app.use(express.json());
app.use('/refs', express.static('static'));
app.use(cors());
app.use('/api', router);

// Указываем путь к статическим файлам фронтенда
app.use(express.static('../kars_touristic/dist'));

// Отправляем index.html при обращении к корневому URL
app.get('/', (req, res) => {
  res.sendFile(path.resolve('../kars_touristic/dist', 'index.html'));
});

async function startApp() {
    try {
        await mongoose.connect(DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(() => console.log('MongoDB connected'))
            .catch(err => console.log('MongoDB connection error:', err));
            
        app.listen(PORT, () => console.log(`Server working on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

startApp()
