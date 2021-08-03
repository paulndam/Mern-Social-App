const express = require("express");
const userController = require("../controller/userController");
const authController = require("../controller/authController");

const router = express.Router();

router.route("/users").get(userController.list).post(userController.create);

router.route("/users/search-users").get(userController.searchUsers);

router
  .route("/users/photo/:userId")
  .get(userController.photo, userController.defaultPhoto);
router.route("/users/defaultphoto").get(userController.defaultPhoto);

router
  .route("/users/follow")
  .put(
    authController.requireSignin,
    userController.addFollowing,
    userController.addFollower
  );

router
  .route("/users/unfollow")
  .put(
    authController.requireSignin,
    userController.removeFollowing,
    userController.removeFollower
  );

router
  .route("/users/findpeople/:userId")
  .get(authController.requireSignin, userController.findPeople);

router
  .route("/users/:userId")
  .get(authController.requireSignin, userController.read)
  .put(
    authController.requireSignin,
    authController.hasAuthorization,
    userController.update
  )
  .delete(
    authController.requireSignin,
    authController.hasAuthorization,
    userController.remove
  );

router.param("userId", userController.userByID);

module.exports = router;
