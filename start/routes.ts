/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

router.get('/', async () => {
    return {
        hello: 'world',
    }
});

router.group(() => {
    router.post('/create', '#controllers/users_controller.store');
}).prefix('/users');