import type { HttpContext } from '@adonisjs/core/http';
import { validBodyUser } from '../validators/user.js';
import User from '../models/user.js';

export default class UsersController {
    async store({ request, response }: HttpContext) {
        try {
            const data = request.all();
            const result = await validBodyUser.validate(data);
            const user: User = await User.create({ ...result });
            const token = await User.accessTokens.create(user);
            response.send({user, token});
        } catch (err) {
            console.error(err);
        }
    }
}