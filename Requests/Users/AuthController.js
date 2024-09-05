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

    async getTouragents(req, res) {
        try {
            const users = await AuthService.getTouragents(req)
            return res.status(200).json(users)
        } catch (e) {
            console.log(e);
            res.status(500).json(e)
        }
    }

    async user(req, res) {
        try {
            const token = req.headers['authorization']?.split(' ')[1];
            if (!token) {
                return res.status(401).json({ message: 'Нет токена' });
            }

            const user = await AuthService.user(token);
            return res.status(200).json(user);
        } catch (e) {
            console.log(e);
            res.status(500).json(e);
        }
    }

    async getOneTouragent(req, res) {
        try {
            const token = req.headers['authorization']?.split(' ')[1];
            if (!token) {
                return res.status(401).json({ message: 'Нет токена' });
            }

            const user = await AuthService.getOneTouragent(token, req.params.id);
            return res.status(200).json(user);
        } catch (e) {
            console.log(e);
            res.status(500).json(e);
        }
    }

    async registration(req, res) {
        try {
            const { 
                username, 
                password, 
                name, 
                phone, 
                email, 
                address='',
                passportNumber='',
                passportSeries='',
                gender='',
                birthDate='',
                role='user', 
                adminPanelAccess=false 
            } = req.body;

            if (!username || !password || !name || !phone || !email) {
                return res.status(400).json({ message: "Все поля обязательны" });
            }

            const userValue = {
                body: {
                    username,
                    password,
                    name,
                    phone,
                    email,
                    address,
                    passportNumber,
                    passportSeries,
                    gender,
                    birthDate,
                    role,
                    adminPanelAccess
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
            const { username, password } = req.body;

            if (!username || !password) {
                return res.status(400).json({ message: "Все поля обязательны" });
            }

            const userValue = {
                body: {
                    username,
                    password,
                }
            };

            const { user, token } = await AuthService.login(userValue);
            return res.status(200).json({ user, token });
        } catch (e) {
            res.status(500).json('Registration error: ' + e.message);
        }
    }

    async userUpdate(req, res) {
        try {
            const token = req.headers['authorization']?.split(' ')[1];
            if (!token) {
                return res.status(401).json({ message: 'Нет токена' });
            }
            const updates = req.body;
            const updatedUser = await AuthService.userUpdate(token, updates);
            res.json(updatedUser);
        } catch (e) {
            res.status(500).json({ message: 'Update error: ' + e.message });
        }
    }

    async userUpdateDebt(req, res) {
        try {
            const debt = req.body.debt;
            const idUser = req.body.idUser;
            const updatedUser = await AuthService.userUpdateDebt(debt, idUser);
            res.json(updatedUser);
        } catch (e) {
            res.status(500).json({ message: 'Update error: ' + e.message });
        }
    }

    async userUpdateAccess(req, res) {
        try {
            const token = req.headers['authorization']?.split(' ')[1];
            if (!token) {
                return res.status(401).json({ message: 'Нет токена' });
            }       
            const updates = {adminPanelAccess: true};
            const updatedUser = await AuthService.userUpdateAccess(token, updates, req.params.id);
            res.json(updatedUser);
        } catch (e) {
            res.status(500).json({ message: 'Update error: ' + e.message });
        }
    }

    async deleteUser(req, res) {
        try {
            const deleteUser = await AuthService.deleteUser(req.params.id)
            return res.status(200).json(deleteUser)
        } catch (e) {
            res.status(500).json(e.message)
        }
    }

    async userCart(req, res) {
        try {
            const token = req.headers['authorization']?.split(' ')[1];
            if (!token) {
                return res.status(401).json({ message: 'Нет токена' });
            }
            const tourId = req.params.id;
            const updatedUser = await AuthService.userCart(token, tourId);
            res.status(200).json(updatedUser);
        } catch (e) {
            res.status(500).json({ message: 'Update error: ' + e.message });
        }
    }

}

export default new AuthController()
