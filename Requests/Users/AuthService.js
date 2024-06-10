import User from "./User.js"
import bcrypt from "bcryptjs"
import { generateAccessToken } from '../Token/tokenService.js';

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

  // async registration(userValue) {
  //   const {
  //     name,
  //     role,
  //     username,
  //     password,
  //   } = userValue.body

  //   const candidate = await User.findOne({
  //     username
  //   })

  //   if (candidate) {
  //     throw new Error("Такой пользователь уже существует");
  //   }

  //   const hashPassword = bcrypt.hashSync(password, 7)

  //   const user = await User.create({
  //     name: name,
  //     role: role,
  //     username: username,
  //     password: hashPassword,
  //   });

  //   return {
  //     user
  //   }
  // }

  async registration(userValue) {
    const {
        name,
        role,
        username,
        password,
    } = userValue.body;

    const candidate = await User.findOne({
        username
    });

    if (candidate) {
        throw new Error("Такой пользователь уже существует");
    }

    const hashPassword = bcrypt.hashSync(password, 7);

    const user = await User.create({
        name: name,
        role: role,
        username: username,
        password: hashPassword,
    });

    const token = generateAccessToken(user._id, user.role);

    return {
        user,
        token
    };
}

  async login(userValue) {
    const {
      username,
      password
    } = userValue

    const user = await User.findOne({
      username
    })

    if (!user) {
      throw new Error("Логин введен неверно");
    }

    const validPassword = bcrypt.compareSync(password, user.password)

    if (!validPassword) {
      throw new Error('Пароль введен неверно');
    } else {
      return user.name
    }

  }
}

export default new PostService();