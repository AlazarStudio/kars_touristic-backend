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
import OnedayTourController from "./Requests/OnedayTour/OnedayTourController.js";

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
router.delete('/deleteRegion/:id', RegionController.deleteRegion);

// Многодневный тур +
router.post('/addMultidayTour', upload.fields([
    { name: 'photos', maxCount: 10 }
]), MultidayTourController.multidayTour);

router.get('/getMultidayTours', MultidayTourController.getMultidayTours);
router.get('/getOneMultidayTour/:id', MultidayTourController.getOneMultidayTour);

router.put('/updateOneMultidayTour/:id', upload.fields([
    { name: 'photos', maxCount: 10 }
]), MultidayTourController.updateOneMultidayTour);

router.delete('/deleteMultidayTour/:id', MultidayTourController.deleteMultidayTour);

// Однодневный тур +
router.post('/addOnedayTour', upload.fields([
    { name: 'photos', maxCount: 10 }
]), OnedayTourController.onedayTour);

router.get('/getOnedayTours', OnedayTourController.getOnedayTours);
router.get('/getOneOnedayTour/:id', OnedayTourController.getOneOnedayTour);

router.put('/updateOneOnedayTour/:id', upload.fields([
    { name: 'photos', maxCount: 10 }
]), OnedayTourController.updateOneOnedayTour);

router.delete('/deleteOnedayTour/:id', OnedayTourController.deleteOnedayTour);

// О нас +
router.put('/aboutCompany', AboutController.aboutCompany);
router.get('/aboutCompany', AboutController.getAboutCompany);

router.put('/mission', AboutController.mission);
router.get('/mission', AboutController.getMission);

router.post('/team', upload.fields([
    { name: 'imgPath' },
]), AboutController.team);

router.get('/getTeam', AboutController.getTeam);
router.delete('/deleteTeam/:id', AboutController.deleteTeam);


// Трансфер +
router.put('/transfer', TransferController.transfer);
router.get('/transfer', TransferController.getTransfer);

// FAQ +
router.post('/faq', FaqController.faq);
router.get('/faq', FaqController.getFaq);
router.delete('/deleteFaq/:id', FaqController.deleteFaq);

// Контакты +
router.put('/contacts', ContactsController.contacts);
router.get('/contacts', ContactsController.getContacts);

// Турагентам 
router.put('/turagent', upload.fields([
    { name: 'docPath' },
]), TuragentController.turagent);
router.get('/turagent', TuragentController.getTuragent);

export default router;