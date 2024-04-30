import Router from "express";
import upload from './Requests/Functions/multerConfig.js';

import AuthController from "./Requests/Users/AuthController.js";
import RegionController from "./Requests/Regions/RegionController.js";
import AboutController from "./Requests/About/AboutController.js";
import TransferController from "./Requests/Transfer/TransferController.js";

const router = new Router()

router.get('/getUsers', AuthController.getUsers);

router.post('/registration', AuthController.registration);
router.post('/login', AuthController.login);

// Регион
router.post('/addRegion', upload.fields([
    { name: 'iconPath' },
    { name: 'coverImgPath' },
    { name: 'backgroundImgPath' }
]), RegionController.addRegion);

router.get('/getRegions', RegionController.getRegions);


// О нас
router.post('/aboutCompany', AboutController.aboutCompany);
router.post('/mission', AboutController.mission);
router.post('/team', upload.fields([
    { name: 'imgPath' },
]), AboutController.team);

// Трансфер
router.post('/transfer', TransferController.transfer);


export default router;