import User from "./User.js"
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken';
import { generateAccessToken } from '../Token/tokenService.js';

import dotenv from 'dotenv';
dotenv.config({ path: './Requests/Token/secret.env' });

class PostService {
  async getUsers(req) {
    const {
      page = 1, perPage = 10, search = '', filter
    } = req.query;

    let modelFilter = {
      name: {
        $regex: search,
        $options: 'i'
      }
    };

    const totalCount = await User.countDocuments(modelFilter).exec();
    const users = await User.find(modelFilter)
      .sort(filter)
      .limit(perPage)
      .skip((page - 1) * perPage)
      .exec();

    return {
      totalCount,
      users
    };
  }

  async user(token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const userId = decoded.id;

      const user = await User.findById(userId);

      return user;
    } catch (e) {
      throw new Error('Не удалось получить информацию о пользователе');
    }
  }

  async registration(userValue) {
    const {
      username,
      password,
      name,
      phone,
      email
    } = userValue.body;

    const candidate = await User.findOne({
      username
    });

    if (candidate) {
      throw new Error("Такой пользователь уже существует");
    }

    const hashPassword = bcrypt.hashSync(password, 7);

    const user = await User.create({
      username: username,
      password: hashPassword,
      name: name,
      phone: phone,
      email: email,
    });

    const token = generateAccessToken(user._id, user.role);

    return {
      user,
      token
    };
  }

  async login(userValue) {
    const { username, password } = userValue.body;
  
    const candidate = await User.findOne({ username });
  
    if (!candidate) {
      throw new Error("Такого пользователя не существует");
    }
  
    const validPassword = bcrypt.compareSync(password, candidate.password);
  
    if (!validPassword) {
      throw new Error("Неверный пароль");
    }
  
    const token = generateAccessToken(candidate._id, candidate.role);
    return { candidate, token };
  }
  
}

export default new PostService();