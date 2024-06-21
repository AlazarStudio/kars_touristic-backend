import express from "express";
import mongoose from "mongoose";
import router from "./router.js"; // Убедитесь, что путь к вашему роутеру верный
// import path from 'path';
import cors from "cors";
import https from 'https';
import fs from 'fs';
import http from 'http';
// import { fileURLToPath } from 'url';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

const PORT_HTTPS = 443; // HTTPS порт
const PORT_HTTP = 80;  // HTTP порт для редиректа
const DB_URL = 'mongodb://127.0.0.1:27017/kars_touristic_DB'; // Строка подключения к MongoDB

const app = express();
app.use(express.json());
app.use(cors());
app.use('/api', router);
app.use('/refs', express.static('static'));
// app.use(express.static(path.resolve(__dirname, '../kars_touristic/dist')));

// app.get('/*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, '../kars_touristic/dist', 'index.html'));
//   });
  
  const sslOptions = {
    key: fs.readFileSync('../../../etc/letsencrypt/live/backend.karstouristic.ru/privkey.pem'),
    cert: fs.readFileSync('../../../etc/letsencrypt/live/backend.karstouristic.ru/fullchain.pem')
  };

  // const sslOptions = {
  //   key: fs.readFileSync('backend.karstouristic.ru/privkey.pem'),
  //   cert: fs.readFileSync('backend.karstouristic.ru/fullchain.pem')
  // };
  
  https.createServer(sslOptions, app).listen(PORT_HTTPS, () => {
    console.log(`HTTPS server running on port ${PORT_HTTPS}`);
  });
   
  async function startApp() {
    try {
      await mongoose.connect(DB_URL, {
        // useNewUrlParser: true,
        // useUnifiedTopology: true
      });
      console.log('MongoDB connected');
    } catch (e) {
      console.error("MongoDB connection error:", e);
    }
  }
  
  startApp();
  
// import express from "express";
// import mongoose from "mongoose";

// import router from "./router.js";

// import path from 'path';
// import cors from "cors"

// const PORT = process.env.PORT || 80
// // const DB_URL = 'mongodb://127.0.0.1:27017/test';
// const DB_URL = 'mongodb://127.0.0.1:27017/kars_touristic_DB';

// const app = express();

// app.use(express.json());
// app.use('/refs', express.static('static'));
// app.use(cors());
// app.use('/api', router);

// // Указываем путь к статическим файлам фронтенда
// app.use(express.static('../kars_touristic/dist'));

// // Отправляем index.html при обращении к корневому URL
// app.get('/', (req, res) => {
//   res.sendFile(path.resolve('../kars_touristic/dist', 'index.html'));
// });

// app.get('*', (req, res) => {
//   res.sendFile(path.resolve('../kars_touristic/dist', 'index.html'));
// });

// async function startApp() {
//     try {
//         await mongoose.connect(DB_URL, {
//             //useNewUrlParser: true,
//             //useUnifiedTopology: true
//         }).then(() => console.log('MongoDB connected'))
//             .catch(err => console.log('MongoDB connection error:', err));
            
//         app.listen(PORT, () => console.log(`Server working on port ${PORT}`))
//     } catch (e) {
//         console.log(e)
//     }
// }

// startApp()
