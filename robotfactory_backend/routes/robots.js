const express = require('express');
const router = express.Router();
const {
  getRobots,
  addRobots,
  deleteRobots,
  turnRight,
  turnLeft,
  moveRobot,
} = require("../controller/robotsController");

router.route('/').get(getRobots).post(addRobots).delete(deleteRobots);
router.route('/right').post(turnRight);
router.route('/left').post(turnLeft);
router.route('/move').post(moveRobot);

module.exports = router;