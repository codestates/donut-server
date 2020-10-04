const express = require("express");
const router = express.Router();
const activityController = require("../controllers/activity");

router.get("/", activityController.getActivityList);

router.post("/", activityController.createActivity);

router.put("/", activityController.editActivity);

router.delete("/", activityController.deleteActivity);

router.get("/:id", activityController.getActivity);

router.post("/join", activityController.joinActivity);

module.exports = router;
