import Router from "express";
import upload from './Requests/Functions/multerConfig.js';

import AuthController from "./Requests/Users/AuthController.js";
import RegionController from "./Requests/Regions/RegionController.js";
import AboutController from "./Requests/About/AboutController.js";
import TransferController from "./Requests/Transfer/TransferController.js";
import FaqController from "./Requests/Faq/FaqController.js";
import ContactsController from "./Requests/Contacts/ContactsController.js";
import TuragentController from "./Requests/Turagent/TuragentController.js";
import MultidayTourController from "./Requests/MultidayTour/MultidayTourController.js";

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

// Многодневный тур
router.post('/addMultidayTour', upload.fields([
    { name: 'photos', maxCount: 10 } 
]), MultidayTourController.multidayTour);


// О нас +
router.post('/aboutCompany', AboutController.aboutCompany);
router.post('/mission', AboutController.mission);
router.post('/team', upload.fields([
    { name: 'imgPath' },
]), AboutController.team);

// Трансфер +
router.post('/transfer', TransferController.transfer);

// FAQ +
router.post('/faq', FaqController.faq);

// Контакты +
router.post('/contacts', ContactsController.contacts);

// Турагентам +
router.post('/turagent', upload.fields([
    { name: 'docPath' },
]), TuragentController.turagent);

export default router;