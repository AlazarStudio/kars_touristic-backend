import AuthService from "./AuthService.js"

class AuthController {

    async getUsers(req, res) {
        try {
            const users = await AuthService.getUsers(req)
            return res.status(200).json(users)
        } catch (e) {
            console.log(e);
            res.status(500).json(e)
        }
    }
    
    async registration(req, res) {
        try {
            const registration = await AuthService.registration(req)
            return res.status(200).json(registration)
        } catch (e) {
            res.status(500).json('Registration error: ' + e)
        }
    }

    async login(req, res) {
        try {
            const login = await AuthService.login(req.body)
            return res.status(200).json(login)
        } catch (e) {
            res.status(500).json('Login error: ' + e)
        }
    }

}

export default new AuthController()
