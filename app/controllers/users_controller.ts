/* eslint-disable */
import type { HttpContext } from '@adonisjs/core/http'
import { validBodyUser } from '../validators/user.js'
import User from '../models/user.js'

export default class UsersController {
    // Проверяем пользователя по учетным данным
    async store({ request, response, auth }: HttpContext) {
        try {
            const { email, password } = request.only(['email', 'password'])
            const user = await User.verifyCredentials(email, password)
            response.send(user)
        } catch (err) {
            console.error(err.code)
            response.abort({ code: err.code }, 400)
        }
    }
    // Создаем нового пользователя в БД и возвращаем токен доступа
    async create({ request, response }: HttpContext) {
        try {
            const data = request.all()
            const result = await validBodyUser.validate(data)
            const user: User = await User.create({ ...result }) // Работа с базой данных
            const token = await User.accessTokens.create(user)
            response.send({ user, token })
        } catch (err) {
            console.error(err)
            response.abort({ code: err.code, message: err.messages[0].message }, err.status)
        }
    }
    // Получение моих данных
    async getMe({ request, response, auth }: HttpContext) {
        try {
            const body = request.all()
            const user = await User.query().select('id','fullName','email','createdAt','updatedAt').where('id', body.id);
            console.log(user);
            
            
        } catch (err) {
            console.error(err)
            response.abort({ code: err.code, message: err.messages[0].message }, err.status)
        }
    }
}
