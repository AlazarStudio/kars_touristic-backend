import express from "express";
import mongoose from "mongoose";
import router from "./router.js";
import cors from "cors";
import https from 'https';
import fs from 'fs';
import http from 'http';
import bodyParser from 'body-parser';

const PORT_HTTPS = 443;
const PORT_HTTP = 80;
const DB_URL = 'mongodb://127.0.0.1:27017/kars_touristic_DB';

const app = express();
app.use(express.json());
app.use(cors());
app.use('/api', router);
app.use('/refs', express.static('static'));
app.use(bodyParser.json());



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
