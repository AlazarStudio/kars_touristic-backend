import Router from "express";
import AuthController from "./Requests/Users/AuthController.js";
import RegionController from "./Requests/Regions/RegionController.js";

import upload from './Requests/Functions/multerConfig.js';

const router = new Router()

router.get('/getUsers', AuthController.getUsers);

router.post('/registration', AuthController.registration);
router.post('/login', AuthController.login);

router.post('/addRegion', upload.fields([
    { name: 'iconPath' },
    { name: 'coverImgPath' },
    { name: 'backgroundImgPath' }
]), RegionController.addRegion);

router.get('/getRegions', RegionController.getRegions);

export default router;