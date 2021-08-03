const express = require("express");
const authController = require("../controller/authController");
const postController = require("../controller/postController");
const userController = require("../controller/userController");

const router = express.Router();

router
  .route("/posts/new/:userId")
  .post(authController.requireSignin, postController.create);

router.route("/posts/photo/:postId").get(postController.photo);

router
  .route("/posts/by/:userId")
  .get(authController.requireSignin, postController.listByUser);

router
  .route("/posts/feed/:userId")
  .get(authController.requireSignin, postController.listNewsFeed);

router
  .route("/posts/like")
  .put(authController.requireSignin, postController.like);

router
  .route("/posts/unlike")
  .put(authController.requireSignin, postController.unlike);

router
  .route("/posts/comment")
  .put(authController.requireSignin, postController.comment);

router
  .route("/posts/uncomment")
  .put(authController.requireSignin, postController.uncomment);

router
  .route("/posts/:postId")
  .delete(
    authController.requireSignin,
    postController.isPoster,
    postController.remove
  );

//using the :userID param in this route to specify the currently signed-in user, and we will utilize the userByID controller method in the user.controller to fetch the user details and append them to the request object that is accessed in the listNewsFeed post controller method.

router.param("userId", userController.userByID);
router.param("postId", postController.postByID);

module.exports = router;
