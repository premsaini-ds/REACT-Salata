import * as React from "react";

type Props = {
  prop1: any;
  prop2: any;
};

const Card = (Data: Props) => {
  return (
    <>
      <div className="about-sec">
        <div className="container">
          <div className="about-content">
            <h3 className="sec_heading">{Data.prop1 ? Data.prop1 : ""}</h3>
            <p>{Data.prop2 ? Data.prop2 : ""}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
