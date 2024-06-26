import Router from "express";
import { upload, convertToWebP } from './Requests/Functions/multerConfig.js';

import AuthController from "./Requests/Users/AuthController.js";
import RegionController from "./Requests/Regions/RegionController.js";
import AboutController from "./Requests/About/AboutController.js";
import TransferController from "./Requests/Transfer/TransferController.js";
import FaqController from "./Requests/Faq/FaqController.js";
import ContactsController from "./Requests/Contacts/ContactsController.js";
import TuragentController from "./Requests/Turagent/TuragentController.js";
import MultidayTourController from "./Requests/MultidayTour/MultidayTourController.js";
import OnedayTourController from "./Requests/OnedayTour/OnedayTourController.js";
import HotelsController from "./Requests/Hotels/HotelsController.js";
import RoomsController from "./Requests/Rooms/RoomsController.js";
import PlacesController from "./Requests/Places/PlacesController.js";
import EventsController from "./Requests/Events/EventsController.js";

const router = new Router()

router.get('/getUsers', AuthController.getUsers);
router.get('/user', AuthController.user);

router.post('/registration', AuthController.registration);
router.post('/login', AuthController.login);

//Конвертор в webp

// router.post('/webpUpload', upload.fields([
//     { name: 'photos'}
// ]), convertToWebP);

// Регион
router.post('/addRegion', upload.fields([
    { name: 'iconPath' },
    { name: 'coverImgPath' },
    { name: 'backgroundImgPath' }
]), convertToWebP, RegionController.addRegion);

router.get('/getRegions', RegionController.getRegions);
router.get('/getOneRegion/:link', RegionController.getOneRegion);

router.delete('/deleteRegion/:id', RegionController.deleteRegion);

//Починить
router.put('/updateRegion/:link', upload.fields([
    { name: 'iconPath' },
    { name: 'coverImgPath' },
    { name: 'backgroundImgPath' }
]), convertToWebP, RegionController.updateRegion);

// Многодневный тур +
router.post('/addMultidayTour', upload.fields([
    { name: 'photos', maxCount: 10 }
]), convertToWebP, MultidayTourController.multidayTour);

router.get('/getMultidayTours', MultidayTourController.getMultidayTours);
router.get('/getOneMultidayTour/:id', MultidayTourController.getOneMultidayTour);

router.put('/updateOneMultidayTour/:id', upload.fields([
    { name: 'photos', maxCount: 10 }
]), convertToWebP, MultidayTourController.updateOneMultidayTour);

router.post('/updateMultidayTourOrder', MultidayTourController.updateMultidayTourOrder);

router.delete('/deleteMultidayTour/:id', MultidayTourController.deleteMultidayTour);

router.put('/changeMainImgMultidayTour', MultidayTourController.changeMainImg);


// Однодневный тур +
router.post('/addOnedayTour', upload.fields([
    { name: 'photos', maxCount: 10 }
]), convertToWebP, OnedayTourController.onedayTour);

router.get('/getOnedayTours', OnedayTourController.getOnedayTours);
router.get('/getOneOnedayTour/:id', OnedayTourController.getOneOnedayTour);

router.put('/updateOneOnedayTour/:id', upload.fields([
    { name: 'photos', maxCount: 10 }
]), convertToWebP, OnedayTourController.updateOneOnedayTour);

router.post('/updateOnedayTourOrder', OnedayTourController.updateOnedayTourOrder);

router.delete('/deleteOnedayTour/:id', OnedayTourController.deleteOnedayTour);

router.put('/changeMainImgOnedayTour', OnedayTourController.changeMainImg);

// О нас +
router.put('/aboutCompany', AboutController.aboutCompany);
router.get('/aboutCompany', AboutController.getAboutCompany);

router.put('/mission', AboutController.mission);
router.get('/mission', AboutController.getMission);

router.post('/team', upload.fields([
    { name: 'imgPath' },
]), convertToWebP, AboutController.team);

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

// Турагентам +
router.put('/turagent', upload.fields([
    { name: 'docPath' },
]), convertToWebP, TuragentController.turagent);
router.get('/turagent', TuragentController.getTuragent);

// Отели
router.post('/addHotels', upload.fields([
    { name: 'galery', maxCount: 10 }
]), convertToWebP, HotelsController.Hotels);

router.get('/getHotels', HotelsController.getHotels);
router.get('/getOneHotel/:id', HotelsController.getOneHotel);

router.put('/updateOneHotel/:id', upload.fields([
    { name: 'galery', maxCount: 10 }
]), convertToWebP, HotelsController.updateOneHotel);

router.post('/updateHotelsOrder', HotelsController.updateHotelsOrder);

router.delete('/deleteHotel/:id', HotelsController.deleteHotel);

router.put('/changeMainImgHotel', HotelsController.changeMainImg);


// Номера
router.post('/addRooms', upload.fields([
    { name: 'photos', maxCount: 10 }
]), convertToWebP, RoomsController.Rooms);

router.get('/getRooms', RoomsController.getRooms);
router.get('/getOneRoom/:id', RoomsController.getOneRoom);

router.put('/updateOneRoom/:id', upload.fields([
    { name: 'photos', maxCount: 10 }
]), convertToWebP, RoomsController.updateOneRoom);

router.post('/updateRoomsOrder', RoomsController.updateRoomsOrder);

router.delete('/deleteRoom/:id', RoomsController.deleteRoom);

router.put('/changeMainImgRoom', RoomsController.changeMainImg);


// Достопримечательности
router.post('/addPlaces', upload.fields([
    { name: 'photos', maxCount: 10 }
]), convertToWebP, PlacesController.Places);

router.get('/getPlaces', PlacesController.getPlaces);

router.get('/getMultidayToursInPlace/:placeTitle', PlacesController.getMultidayToursInPlace);
router.get('/getOnedayToursInPlace/:placeTitle', PlacesController.getOnedayToursInPlace);

router.get('/getOnePlace/:id', PlacesController.getOnePlace);

router.put('/updateOnePlace/:id', upload.fields([
    { name: 'photos', maxCount: 10 }
]), convertToWebP, PlacesController.updateOnePlace);

router.post('/updatePlacesOrder', PlacesController.updatePlacesOrder);

router.delete('/deletePlace/:id', PlacesController.deletePlace);

router.put('/changeMainImgPlace', PlacesController.changeMainImg);


// Мероприятия
router.post('/addEvents', upload.fields([
    { name: 'photos', maxCount: 10 }
]), convertToWebP, EventsController.Events);

router.get('/getEvents', EventsController.getEvents);

router.get('/getOneEvent/:id', EventsController.getOneEvent);

router.put('/updateOneEvent/:id', upload.fields([
    { name: 'photos', maxCount: 10 }
]), convertToWebP, EventsController.updateOneEvent);

router.post('/updateEventsOrder', EventsController.updateEventsOrder);

router.delete('/deleteEvent/:id', EventsController.deleteEvent);

router.put('/changeMainImgEvent', EventsController.changeMainImg);

export default router;