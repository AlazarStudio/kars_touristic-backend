import Router from "express";
import AuthController from "./Requests/Users/AuthController.js";
import RegionController from "./Requests/Regions/RegionController.js";
import multer from "multer";

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => cb(null, 'uploads/'),
//     filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
// });
// const upload = multer({ storage: storage });

const router = new Router()

router.get('/getUsers', AuthController.getUsers)
router.post('/registration', AuthController.registration)
router.post('/login', AuthController.login)

router.post('/addRegion', RegionController.addRegion);

export default router;