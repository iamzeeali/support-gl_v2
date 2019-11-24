const express = require("express");
const userController = require("./../controllers/userController");
const authController = require("./../controllers/authController");
const multer = require("multer");

const router = express.Router();

router.post("/login", authController.login);
router.post("/forgotPassword", authController.forgotPassword);
router.patch("/resetPassword/:token", authController.resetPassword);

//Protect all routes after this middleware
router.use(authController.protect);

router.patch("/updateMyPassword", authController.updatePassword);
router.get("/me", userController.getMe, userController.getUser);
router.patch("/updateMe", userController.updateMe);
router.delete("/deleteMe", userController.deleteMe);

router.patch("/upload/:id", userController.upload);

router.post("/signup", authController.signup);

router.use(authController.restrictTo("super-admin", "admin"));

router
  .route("/")
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route("/member")
  .get(authController.restrictTo("admin"), userController.getMembers);

router.patch(
  "/member/:id",
  authController.restrictTo("admin"),
  userController.deleteMember
);

router
  .route("/:id")
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(authController.restrictTo("super-admin"), userController.deleteUser);

module.exports = router;
