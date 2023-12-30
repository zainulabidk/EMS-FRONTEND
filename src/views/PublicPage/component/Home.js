import React from "react";
import "./style.css"; 

const Home = () => {
  return (
    <div>
      <div className="intro">
        <div className="quote">
          <h1>ENQUIRY MANAGMENT SYSTEM </h1>
          <p >
            Collects essential inquiry data, including contact info and type,<br></br>
            for precise record-keeping in the Enquiry Management System (EMS).
          </p>
        </div>
        <div className="squares-wrapper">
          <ul className="squares">
            {Array.from({ length: 30 }).map((_, i) => (
              <li
                key={i}
                style={{
                  left: `${Math.floor(Math.random() * 90)}%`,
                  width: `${Math.floor(Math.random() * (150 - 15 + 1) + 15)}px`,
                  height: `${Math.floor(
                    Math.random() * (150 - 15 + 1) + 15
                  )}px`,
                  animationDelay: `${
                    i % 2 ? Math.floor(Math.random() * 20) : 0
                  }s`,
                  animationDuration: `${Math.floor(
                    Math.random() * (50 - 10 + 1) + 10
                  )}s`,
                }}
              />
            ))}
          </ul>
        </div>
        <div className="image-overlay" />
      </div>
    </div>
  );
};

export default Home;