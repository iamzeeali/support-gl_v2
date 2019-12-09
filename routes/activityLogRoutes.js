const express = require("express");
const authController = require("./../controllers/authController");
const activityLogController = require("./../controllers/activityLogController");

const router = express.Router();

//Protect all routes after this middleware
router.use(authController.protect);

router.use(authController.restrictTo("admin", "user", "super-admin"));

router
  .route("/")
  .get(activityLogController.getActivityLogs)
  .post(activityLogController.createActivityLog);

router
  .route("/all")
  .get(
    authController.restrictTo("super-admin"),
    activityLogController.getAllActivityLogs
  );
router.route("/count").get(activityLogController.getActivityLogsCount);
router.route("/openStatusCount").get(activityLogController.getOpenStatusCount);
router.route("/openStatus").get(activityLogController.getOpenStatus);
router.route("/30days").get(activityLogController.get30daysActivityLogs);
router
  .route("/30daysCount")
  .get(activityLogController.get30daysActivityLogsCount);

//*********************************COMPANY*************************** */
router
  .route("/company")
  .get(
    authController.restrictTo("admin"),
    activityLogController.getCompanyActivityLogs
  );
router
  .route("/openStatusCount/company")
  .get(activityLogController.getCompanyOpenStatusCount);
router
  .route("/openStatus/company")
  .get(activityLogController.getCompanyOpenStatus);
router
  .route("/30days/company")
  .get(activityLogController.getCompany30daysActivityLogs);
router
  .route("/30daysCount/company")
  .get(activityLogController.getCompany30daysActivityLogsCount);

router
  .route("/:id")
  .get(activityLogController.getActivityLog)
  .patch(
    authController.restrictTo("super-admin"),
    activityLogController.updateActivityLog
  )
  .delete(
    authController.restrictTo("super-admin"),
    activityLogController.deleteActivityLog
  );

module.exports = router;
