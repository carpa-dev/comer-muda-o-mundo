'use strict';

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

// public
Route.group(() => {
  Route.post('/auth/register', 'AuthController.register');
  Route.post('/auth/login', 'AuthController.login');
  Route.post('/auth/refresh', 'AuthController.refresh');

  // Route.resource('/producers', 'ProducerController').only(['index', 'show']);
}).prefix('/api/v1');

Route.group(() => {
  Route.get('/public-initiatives', 'PublicInitiativeController.index');
}).prefix('/api/v1');

// protected

// payload is different whether you are logged in or not
Route.group(() => {
  Route.resource('/producers', 'Admin/ProducerController');
})
  .prefix('/api/v1')
  .middleware(['auth']);

Route.get('/', () => {
  return {
    hello: 'world',
  };
}).middleware(['auth']);