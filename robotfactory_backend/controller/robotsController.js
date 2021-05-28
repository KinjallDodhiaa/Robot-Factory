const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("data/db.json");
const db = low(adapter);
const isEmpty = require("lodash.isempty");

turnRight = (direction) => {
  switch (direction) {
    case "NORTH":
      return "EAST";
    case "EAST":
      return "SOUTH";
    case "SOUTH":
      return "WEST";
    case "WEST":
      return "NORTH";
    default:
      return direction;
  }
};

turnLeft = (direction) => {
  switch (direction) {
    case "NORTH":
      return "WEST";
    case "EAST":
      return "NORTH";
    case "SOUTH":
      return "EAST";
    case "WEST":
      return "SOUTH";
    default:
      return direction;
  }
};

moveForward = (direction, posX, posY) => {
  console.log(direction);
  switch (direction) {
    case "NORTH":
      return { posX: posX, posY: posY + 1 };
    case "EAST":
      return { posX: posX + 1, posY: posY };
    case "SOUTH":
      return { posX: posX, posY: posY - 1 };
    case "WEST":
      return { posX: posX - 1, posY: posY };
    default:
      return { posX: null, posY: null };
  }
};

// moveRobot = (robot) => {
//   switch (robot.direction) {
//     case "NORTH":
//       robot.posY++;
//       break;
//     case "EAST":
//       robot.posX++;
//       break;
//     case "SOUTH":
//       robot.posY--;
//       break;
//     case "WEST":
//       robot.posX--;
//       break;
//     default:
//       null;
//   }
//   return {
//     posX: robot.posX,
//     posY: robot.posY,
//   };
// };

exports.getRobots = (req, res, next) => {
  //get all records
  try {
    const robots = db.get("robots").value();
    res.status(200).send(robots);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.addRobots = (req, res, next) => {
  try {
    if(req.body.name === ''){
      const error = new Error('INVALID REQUEST MESSAGE');
      //BAD REQUEST
      error.status = 400;
      error.stack = null;
      next(error)
    } else{

    //body from the request
    const robot = req.body;
    //add a record to the database
    db.get("robots")
      //add record to the array
      .push(robot)
      //get access to the last element in the array
      .last()
      //assign id to the object
      .assign({ id: Math.floor(Math.random() * 10).toString() })
      .write();

    //send back the newly created record
    res.status(201).send(robot);
  } }catch (error) {
    console.log(error);
    next(error);
  }
};

exports.deleteRobots = (req, res, next) => {
  try {
    const robotId = req.body.id;
    db.get("robots").remove({ id: robotId }).write();
    res.status(200).send("SUCCESS");
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// To Update a post.
//     db.get('posts')
//     .find({ title: 'low!' })
//     .assign({ title: 'hi!' })
//     .write()

exports.turnRight = (req, res, next) => {
  try {
    const robotId = req.body.id;
    const robot = db.get("robots").find({ id: robotId }).value();
    db.get("robots")
      .find({ id: robotId })
      .assign({
        direction: turnRight(robot.direction),
      })
      .write();
    res.status(200).send(robot);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.turnLeft = (req, res, next) => {
  try {
    const robotId = req.body.id;
    const robot = db.get("robots").find({ id: robotId }).value();
    db.get("robots")
      .find({ id: robotId })
      .assign({
        direction: turnLeft(robot.direction),
      })
      .write();
    res.status(200).send(robot);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.moveRobot = (req, res, next) => {
  try {
    const robotId = req.body.id;
    const robot = db.get("robots").find({ id: robotId }).value();
    const coordinates = moveForward(robot.direction, robot.posX, robot.posY);
    db.get("robots")
      .find({ id: robotId })
      .assign({
        posX: coordinates.posX,
        posY: coordinates.posY,
      })
      .write();
    res.status(200).send(robot);
    console.log(coordinates);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// exports.moveRobot = (req, res) => {
//     const robotId = req.body.id;
//     const robot = db.get('robots').find({ id: robotId }).value();
//     const robotDirection = moveRobot(robot);
//     db.get("robots")
//       .find({ id: robotId })
//       .assign({
//         posX: robotDirection.posX,
//         posY: robotDirection.posY
//       })
//       .write();
//     res.status(200).send(robot)}
