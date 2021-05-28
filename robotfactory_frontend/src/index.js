import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/home';
import OurRobots from './components/ourRobots';
import RobotDetails from './components/robotDetails';
import './css/style.css';
import "bootstrap/dist/css/bootstrap.min.css";

const axios = require("axios").default;


const App = () => {

  const [robot, setRobot] = useState([]);

  useEffect(() => {
    sendGetRequest();
  }, []);

  const sendGetRequest = async () => {
    try {
      await axios
        .get("http://localhost:3002/robots/")
        .then((response) => setRobot(response.data));
    } catch (err) {
      // error handling
      console.error(err);
    }
  };



  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/ourRobots">
          <OurRobots
            //   add={sendGetRequest}
            show={robot}
            sendGetRequest={sendGetRequest}
          />
        </Route>
        <Route path="/robotDetails/:id">
          <RobotDetails showDetails={robot} sendGetRequest={sendGetRequest} />
        </Route>
      </Switch>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));