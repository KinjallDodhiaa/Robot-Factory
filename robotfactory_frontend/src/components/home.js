import React from "react";
import { Link } from "react-router-dom";
import "../css/style.css";

const Home = () => {
  return (
    <div className="div-container">
      <section className="section-1">
        <div className="div-navbar">
          <Link to="/" className="navbar-link">
            Home
          </Link>
          <Link to="/ourRobots" className="navbar-link">
            Our Robots
          </Link>
        </div>

        <div className="section-1-banner center">
          <h1>THE ROBOT FACTORY</h1>
          <p>Building and programming a brighter future with robots</p>
          <span>- The Magnificent Four</span>
          <Link to="/ourRobots">
            <button type="button">Discover Now</button>
          </Link>
        </div>
        <div className="imageshow">
          <img src="../images/robot-factory.jpeg" />
        </div>
      </section>
    </div>
  );
};

export default Home;
