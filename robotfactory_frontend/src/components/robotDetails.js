import React from "react";
import { Link, useParams } from "react-router-dom";
const axios = require("axios").default;

const RobotDetails = (props) => {
  const { id } = useParams();
  //console.log(id);

  const foundRobot = props.showDetails.find((robot) => id == robot.id);
  //     //console.log(props.robots);

  const moveRobotRight = async (id) => {
    try {
      axios
        .post("http://localhost:3002/robots/right", { id: id })
        .then((res) => props.sendGetRequest());
    } catch (error) {
      console.log(error);
    }
  };

  const moveRobotLeft = async (id) => {
    try {
      axios
        .post("http://localhost:3002/robots/left", { id: id })
        .then((res) => props.sendGetRequest());
    } catch (error) {
      console.log(error);
    }
  };

  const moveRobotForward = async (id) => {
    try {
      axios
        .post("http://localhost:3002/robots/move", { id: id })
        .then((res) => props.sendGetRequest());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <section className="section-3">
        <div className="div-navbar">
          <Link to="/" className="navbar-link">
            Home
          </Link>
          <Link to="/ourRobots" className="navbar-link">
            Our Robots
          </Link>
        </div>

        <div className="section-3-banner">
          {foundRobot ? (
            <>
              <h3>Name</h3>
              <p>{foundRobot.name}</p>
              <h3>Position</h3>
              <ul className="ml-3">
                <li>PosX:{foundRobot.posX}</li>
                <li>PosY:{foundRobot.posY}</li>
              </ul>
              <h3>Heading</h3>
              <p>{foundRobot.direction}</p>
              <div className='buttonDiv'>
                <button
                  onClick={() => {
                    moveRobotRight(foundRobot.id);
                  }}
                >
                  Right
                </button>
                <button
                  onClick={() => {
                    moveRobotLeft(foundRobot.id);
                  }}
                >
                  Left
                </button>
                <button
                  onClick={() => {
                    moveRobotForward(foundRobot.id);
                  }}
                >
                  Move
                </button>
              </div>
            </>
          ) : null}
        </div>

        <div className="imageshow">
          <img src="../images/robot-factory.jpeg" />
        </div>
      </section>
    </>
  );
};

export default RobotDetails;

