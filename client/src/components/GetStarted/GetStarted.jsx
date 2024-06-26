import React from "react";
import "./GetStarted.css";
const GetStarted = () => {
  return (
    <div id="get-started" className="g-wrapper">
      <div className="paddings innerWidth g-container">
        <div className="flexColCenter inner-container">
          <span className="primaryText">Get started with HomeLander</span>
          <span className="secondaryText">
            Subscribe to our weekly newsletter and never miss Hot and Trending Properties at super attractive price quotes from us.
            <br />
            Find your residence soon.
          </span>
          <button className="button" href>
            <a href="mailto:samyak.shukla2001@gmail.com">Get Started</a>
          </button>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;
