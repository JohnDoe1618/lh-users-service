/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
router.get('/', async () => {
    return {
        hello: 'world',
    }
})

router
    .group(() => {
        router.post('/create', '#controllers/users_controller.create')
        router.post('/fetch', '#controllers/users_controller.store')
        router.post('/me', '#controllers/users_controller.getMe').use(
            middleware.auth({
                guards: ['api'],
            })
        )
    })
    .prefix('/users')

router
    .group(() => {
        router.get('/example', async () => {
            return {
                another_route: router,
            }
        })
    })
    .prefix('/another')
