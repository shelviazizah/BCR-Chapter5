const express = require("express");
const controllers = require("../app/controllers");
const uploadImage = require("./../uploadOnMemory");

const multer = require('multer');

const apiRouter = express.Router();

/**
 * TODO: Implement your own API
 *       implementations
 */

// ROUTES FOR POST
apiRouter.get("/api/v1/posts", controllers.api.v1.authController.authorize, controllers.api.v1.postController.list);
apiRouter.post("/api/v1/posts", controllers.api.v1.postController.create);
apiRouter.put("/api/v1/posts/:id", controllers.api.v1.postController.update);
apiRouter.get("/api/v1/posts/:id", controllers.api.v1.postController.show);
apiRouter.delete("/api/v1/posts/:id", controllers.api.v1.postController.destroy);

// ROUTES FOR CARS
//  controllers.api.v1.authController.authorize
apiRouter.get("/api/v1/cars", controllers.api.v1.authController.authorize, controllers.api.v1.carController.list);
apiRouter.post("/api/v1/cars", controllers.api.v1.authController.authorize, controllers.api.v1.authController.authorizeUserRole, uploadImage.single('image'), controllers.api.v1.carController.create);
apiRouter.put("/api/v1/cars/:id", controllers.api.v1.authController.authorize, controllers.api.v1.authController.authorizeUserRole, uploadImage.single('image'), controllers.api.v1.carController.update);
apiRouter.get("/api/v1/cars/:id", controllers.api.v1.carController.show);
apiRouter.delete("/api/v1/cars/:id", controllers.api.v1.authController.authorize, controllers.api.v1.authController.authorizeUserRole, controllers.api.v1.carController.destroy);

// ROUTES FOR USER
apiRouter.get("/api/v1/users", controllers.api.v1.authController.authorize, controllers.api.v1.authController.authorizeUserRole, controllers.api.v1.userController.list);
apiRouter.post("/api/v1/users", controllers.api.v1.userController.create);
apiRouter.post("/api/v1/register", controllers.api.v1.authController.register);
apiRouter.post("/api/v1/login", controllers.api.v1.authController.login);
apiRouter.post("/api/v1/admin/register", controllers.api.v1.authController.authorize, controllers.api.v1.authController.isSuperAdmin, controllers.api.v1.authController.registerAdmin);

/**
 * TODO: Delete this, this is just a demonstration of
 *       error handler
 */
apiRouter.get("/api/v1/errors", () => {
  throw new Error(
    "The Industrial Revolution and its consequences have been a disaster for the human race."
  );
});

apiRouter.use(controllers.api.main.onLost);
apiRouter.use(controllers.api.main.onError);

module.exports = apiRouter;
