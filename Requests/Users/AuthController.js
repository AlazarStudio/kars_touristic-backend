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
            const { username, password, name, role } = req.query; // Используем req.query для получения параметров запроса

            if (!username || !password || !name || !role) {
                return res.status(400).json({ message: "Все поля обязательны" });
            }

            const userValue = {
                body: {
                    username,
                    password,
                    name,
                    role
                }
            };

            const { user, token } = await AuthService.registration(userValue);
            return res.status(200).json({ user, token });
        } catch (e) {
            res.status(500).json('Registration error: ' + e.message);
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
