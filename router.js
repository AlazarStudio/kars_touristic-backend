import Router from "express";
import AuthController from "./Requests/Users/AuthController.js";

const router = new Router()

router.get('/getUsers', AuthController.getUsers)
router.post('/registration', AuthController.registration)
router.post('/login', AuthController.login)


export default router;