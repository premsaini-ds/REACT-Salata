import * as React from "react";

type Props = {
  c_title: any;
  c_description1: any;
  c_backgroundImages: any;
};

const AddPromotion = (Data: Props) => {
  return (
    <>
      <div className="app_promotion-sec">
        <img
          className="app-bg"
          src={
            Data.c_backgroundImages[0].url ? Data.c_backgroundImages[0].url : ""
          }
          alt="app-bg"
          title="app-bg"
        />
        <div className="container flex flex-wrap items-center">
          <div className="w-full app_promotion-content">
            <h3>{Data.c_title}</h3>
            <p>{Data.c_description1}</p>
          </div>

          <div className="phone-img">
            <img src="" alt="phone-img" title="phone-img" />
          </div>
        </div>
      </div>
    </>
  );
};
export default AddPromotion;
