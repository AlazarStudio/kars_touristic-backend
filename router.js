import Router from "express";
import { upload, convertToWebP } from "./Requests/Functions/multerConfig.js";

import AuthController from "./Requests/Users/AuthController.js";
import RegionController from "./Requests/Regions/RegionController.js";
import AboutController from "./Requests/About/AboutController.js";
import TransferController from "./Requests/Transfer/TransferController.js";
import FaqController from "./Requests/Faq/FaqController.js";
import ContactsController from "./Requests/Contacts/ContactsController.js";
import TuragentController from "./Requests/Turagent/TuragentController.js";
import MultidayTourController from "./Requests/MultidayTour/MultidayTourController.js";
import AuthorTourController from "./Requests/AuthorTour/AuthorTourController.js";
import OnedayTourController from "./Requests/OnedayTour/OnedayTourController.js";
import HotelsController from "./Requests/Hotels/HotelsController.js";
import RoomsController from "./Requests/Rooms/RoomsController.js";
import PlacesController from "./Requests/Places/PlacesController.js";
import EventsController from "./Requests/Events/EventsController.js";
import AgentController from "./Requests/Agent/AgentController.js";
import HotelBronController from "./Requests/HotelBron/HotelBronController.js";
import MailController from "./Requests/sendMail/MailController.js";
import ReviewController from "./Requests/Review/ReviewController.js";
import PartnerController from "./Requests/Partner/PartnerController.js";

const router = new Router();

router.post("/send-email-file", MailController.sendEmail_file);
router.post("/send-email-file-hotel", MailController.sendEmail_file_hotel);
router.post("/send-email", MailController.sendEmail);

router.get("/getUsers", AuthController.getUsers);
router.get("/getTouragents", AuthController.getTouragents);

router.get("/user", AuthController.user);
router.get("/getOneTouragent/:id", AuthController.getOneTouragent);

router.post("/registration", AuthController.registration);
router.post("/login", AuthController.login);

router.put("/userUpdate", AuthController.userUpdate);
router.put("/userUpdateDebt", AuthController.userUpdateDebt);

router.put("/userUpdateAccess/:id", AuthController.userUpdateAccess);

router.delete("/deleteUser/:id", AuthController.deleteUser);

router.delete("/userCart/:id", AuthController.userCart);

// Регион
router.post(
  "/addRegion",
  upload.fields([
    { name: "iconPath" },
    { name: "coverImgPath" },
    { name: "backgroundImgPath" },
  ]),
  convertToWebP,
  RegionController.addRegion
);

router.get("/getRegions", RegionController.getRegions);
router.get("/getOneRegion/:link", RegionController.getOneRegion);

router.delete("/deleteRegion/:id", RegionController.deleteRegion);

router.put(
  "/updateRegion/:id",
  upload.fields([
    { name: "iconPath" },
    { name: "coverImgPath" },
    { name: "backgroundImgPath" },
  ]),
  convertToWebP,
  RegionController.updateRegion
);

router.post("/saveRegionsOrder", RegionController.saveRegionsOrder);

// Авторский тур +
router.post(
  "/addAuthorTours",
  upload.fields([{ name: "photos", maxCount: 10 }]),
  convertToWebP,
  AuthorTourController.AuthorTour
);

router.get("/getAuthorTours", AuthorTourController.getAuthorTours);
router.get("/getOneAuthorTours/:id", AuthorTourController.getOneAuthorTour);

router.put(
  "/updateOneAuthorTour/:id",
  upload.fields([{ name: "photos", maxCount: 10 }]),
  convertToWebP,
  AuthorTourController.updateOneAuthorTour
);

router.post(
  "/updateAuthorTourOrder",
  AuthorTourController.updateAuthorTourOrder
);

router.delete("/deleteAuthorTour/:id", AuthorTourController.deleteAuthorTour);

router.put("/changeMainImgAuthorTour", AuthorTourController.changeMainImg);

// Многодневный тур +
router.post(
  "/addMultidayTour",
  upload.fields([{ name: "photos", maxCount: 10 }]),
  convertToWebP,
  MultidayTourController.multidayTour
);

router.post(
  "/dublicateMultidayTour",
  MultidayTourController.dublicateMultidayTour
);

router.get("/getMultidayTours", MultidayTourController.getMultidayTours);
router.get(
  "/getOneMultidayTour/:id",
  MultidayTourController.getOneMultidayTour
);

router.put(
  "/updateOneMultidayTour/:id",
  upload.fields([{ name: "photos", maxCount: 10 }]),
  convertToWebP,
  MultidayTourController.updateOneMultidayTour
);

router.post(
  "/updateMultidayTourOrder",
  MultidayTourController.updateMultidayTourOrder
);

router.delete(
  "/deleteMultidayTour/:id",
  MultidayTourController.deleteMultidayTour
);

router.put("/changeMainImgMultidayTour", MultidayTourController.changeMainImg);

// Однодневный тур +
router.post(
  "/addOnedayTour",
  upload.fields([{ name: "photos", maxCount: 10 }]),
  convertToWebP,
  OnedayTourController.onedayTour
);

router.post("/dublicateOnedayTour", OnedayTourController.dublicateOnedayTour);

router.get("/getOnedayTours", OnedayTourController.getOnedayTours);
router.get("/getOneOnedayTour/:id", OnedayTourController.getOneOnedayTour);

router.put(
  "/updateOneOnedayTour/:id",
  upload.fields([{ name: "photos", maxCount: 10 }]),
  convertToWebP,
  OnedayTourController.updateOneOnedayTour
);

router.post(
  "/updateOnedayTourOrder",
  OnedayTourController.updateOnedayTourOrder
);

router.delete("/deleteOnedayTour/:id", OnedayTourController.deleteOnedayTour);

router.put("/changeMainImgOnedayTour", OnedayTourController.changeMainImg);

// Agent +
router.post("/addAgent", AgentController.agent);
router.post("/updateAgentOrder", AgentController.updateAgentOrder);

router.get("/getAgents", AgentController.getAgents);
router.get("/getOneAgent/:id", AgentController.getOneAgent);

router.put("/updateOneAgent/:id", AgentController.updateOneAgent);
router.put("/changeMainImgAgent", AgentController.changeMainImg);

router.delete("/deleteAgent/:id", AgentController.deleteAgent);
router.delete("/deleteAllAgents", AgentController.deleteAllAgents);

// HotelBron +
router.post("/addHotelBron", HotelBronController.hotelBron);
router.post("/updateHotelBronOrder", HotelBronController.updateHotelBronOrder);

router.get("/getHotelBrons", HotelBronController.getHotelBrons);
router.get("/getOneHotelBron/:id", HotelBronController.getOneHotelBron);

router.put(
  "/updateHotelBronStatus/:id",
  HotelBronController.updateHotelBronStatus
);

router.put("/updateOneHotelBron/:id", HotelBronController.updateOneHotelBron);
router.put("/changeMainImgHotelBron", HotelBronController.changeMainImg);

router.delete("/deleteHotelBron/:id", HotelBronController.deleteHotelBron);
router.delete("/deleteAllHotelBrons", HotelBronController.deleteAllHotelBrons);

// О нас +
router.put("/aboutCompany", AboutController.aboutCompany);
router.get("/aboutCompany", AboutController.getAboutCompany);

router.put("/mission", AboutController.mission);
router.get("/mission", AboutController.getMission);

router.post(
  "/team",
  upload.fields([{ name: "imgPath" }]),
  convertToWebP,
  AboutController.team
);

router.get("/getTeam", AboutController.getTeam);
router.delete("/deleteTeam/:id", AboutController.deleteTeam);

// Трансфер +
router.get("/transfer", TransferController.getTransfer);
router.put("/transfer/:id", TransferController.updateTransfer);
router.post("/transfer", TransferController.transfer);
router.delete("/transfer/:id", TransferController.deleteTransfer);

router.put("/transferInfo", AboutController.transferInfo);
router.get("/getTransferInfo", AboutController.getTransferInfo);

// FAQ +
router.post("/faq", FaqController.faq);
router.get("/faq", FaqController.getFaq);
router.delete("/deleteFaq/:id", FaqController.deleteFaq);

router.put("/faqInfo", AboutController.faqInfo);
router.get("/getTransferInfo", AboutController.getTransferInfo);

// Контакты +
router.put("/contacts", ContactsController.contacts);
router.get("/contacts", ContactsController.getContacts);

// Турагентам +
router.put(
  "/turagent",
  upload.fields([{ name: "docPath" }]),
  convertToWebP,
  TuragentController.turagent
);
router.get("/turagent", TuragentController.getTuragent);

// Отели
router.post(
  "/addHotels",
  upload.fields([{ name: "galery", maxCount: 10 }]),
  convertToWebP,
  HotelsController.Hotels
);

router.get("/getHotels", HotelsController.getHotels);
router.get("/getOneHotel/:id", HotelsController.getOneHotel);

router.put(
  "/updateOneHotel/:id",
  upload.fields([{ name: "galery", maxCount: 10 }]),
  convertToWebP,
  HotelsController.updateOneHotel
);

router.post("/updateHotelsOrder", HotelsController.updateHotelsOrder);

router.delete("/deleteHotel/:id", HotelsController.deleteHotel);

router.put("/changeMainImgHotel", HotelsController.changeMainImg);

// Номера
router.post(
  "/addRooms",
  upload.fields([{ name: "photos", maxCount: 10 }]),
  convertToWebP,
  RoomsController.Rooms
);

router.get("/getRooms", RoomsController.getRooms);
router.get("/getOneRoom/:id", RoomsController.getOneRoom);

router.put(
  "/updateOneRoom/:id",
  upload.fields([{ name: "photos", maxCount: 10 }]),
  convertToWebP,
  RoomsController.updateOneRoom
);

router.post("/updateRoomsOrder", RoomsController.updateRoomsOrder);

router.delete("/deleteRoom/:id", RoomsController.deleteRoom);

router.put("/changeMainImgRoom", RoomsController.changeMainImg);

// Достопримечательности
router.post(
  "/addPlaces",
  upload.fields([{ name: "photos", maxCount: 10 }]),
  convertToWebP,
  PlacesController.Places
);

router.get("/getPlaces", PlacesController.getPlaces);

router.get(
  "/getMultidayToursInPlace/:placeTitle",
  PlacesController.getMultidayToursInPlace
);
router.get(
  "/getOnedayToursInPlace/:placeTitle",
  PlacesController.getOnedayToursInPlace
);

router.get("/getOnePlace/:id", PlacesController.getOnePlace);

router.put(
  "/updateOnePlace/:id",
  upload.fields([{ name: "photos", maxCount: 10 }]),
  convertToWebP,
  PlacesController.updateOnePlace
);

router.post("/updatePlacesOrder", PlacesController.updatePlacesOrder);

router.delete("/deletePlace/:id", PlacesController.deletePlace);

router.put("/changeMainImgPlace", PlacesController.changeMainImg);

// Мероприятия
router.post(
  "/addEvents",
  upload.fields([{ name: "photos", maxCount: 10 }]),
  convertToWebP,
  EventsController.Events
);

router.get("/getEvents", EventsController.getEvents);

router.get("/getOneEvent/:id", EventsController.getOneEvent);

router.put(
  "/updateOneEvent/:id",
  upload.fields([{ name: "photos", maxCount: 10 }]),
  convertToWebP,
  EventsController.updateOneEvent
);

router.post("/updateEventsOrder", EventsController.updateEventsOrder);

router.delete("/deleteEvent/:id", EventsController.deleteEvent);

router.put("/changeMainImgEvent", EventsController.changeMainImg);

// Отзывы

router.post(
  "/addReview",
  upload.fields([{ name: "photos", maxCount: 10 }]),
  convertToWebP,
  ReviewController.Review
);

router.get("/getReview", ReviewController.getReview);
router.get("/getOneReview/:id", ReviewController.getOneReview);

router.put(
  "/updateOneReview/:id",
  upload.fields([{ name: "photos", maxCount: 10 }]),
  convertToWebP,
  ReviewController.updateOneReview
);

router.delete("/deleteReview/:id", ReviewController.deleteReview);

// Partner

router.post(
  "/Partner",
  upload.fields([{ name: "img", maxCount: 10 }]),
  convertToWebP,
  PartnerController.Partner
);
router.get("/getPartner", PartnerController.getPartner);
router.get("/getOnePartner/:id", PartnerController.getOnePartner);
router.put(
  "/updateOnePartner/:id",
  upload.fields([{ name: "img", maxCount: 10 }]),
  convertToWebP,
  PartnerController.updateOnePartner
);
router.delete("/deletePartner/:id", PartnerController.deletePartner);

//

export default router;
