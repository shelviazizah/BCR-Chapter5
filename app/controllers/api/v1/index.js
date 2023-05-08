/**
 * @file contains entry point of controllers api v1 module
 * @author Shelvi Azizah
 */

const postController = require("./postController");
const userController = require("./userController");
const authController = require("./authController");
const carController = require("./carController");

module.exports = {
  postController,
  userController,
  authController,
  carController,
};
