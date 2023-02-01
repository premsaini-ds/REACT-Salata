import * as React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";

import "@splidejs/react-splide/css";
type c_foodItems = {
  prop: any;
};

var desktopSliderType: string = "";
var tabSliderType: string = "";
var mobileSliderType: string = "";
var desktopSliderCenter: string = "";
var tabSliderCenter: string = "";
var mobileSliderCenter: string = "";
const List = (foodItem: c_foodItems) => {
  let length = foodItem.prop.length;
  desktopSliderType = length > 4 ? "loop" : "slide";
  tabSliderType = length > 2 ? "loop" : "slide";
  mobileSliderType = length > 1 ? "loop" : "slide";
  desktopSliderCenter = length > 4 ? "" : "center-4";
  tabSliderCenter = length > 2 ? "" : "center-2";
  mobileSliderCenter = length > 1 ? "" : "center-1";
  // console.log(foodItem.prop);
  return (
    <>
      <div
        className={`food-list ${desktopSliderCenter} ${tabSliderCenter} ${mobileSliderCenter}`}
      >
        <div className="container">
          <div className="w-full text-center">
            <h3 className="sec_heading">OUR FOOD</h3>
          </div>
          <Splide
            options={{
              rewind: false,
              type: desktopSliderType,
              perPage: 4,
              perMove: 1,
              arrows: true,
              drag: false,
              pagination: false,
              lazyLoad: "nearby",
              breakpoints: {
                1279: {
                  perPage: 2,
                  drag: true,
                  pagination: true,
                  type: tabSliderType,
                },
                575: {
                  perPage: 1,
                  padding: "45px",
                  type: mobileSliderType,
                },
              },
            }}
          >
            
            {foodItem.prop &&
              foodItem.prop.map((i: any, index) => {
                return (
                  <SplideSlide key={index}>
                    <div className="slide-img">
                      <img
                        src={i.url ? i.url : ""}
                        className="block"
                        alt={i.alternateText}
                        title={i.alternateText}
                      />
                      {i.alternateText ? <h4>{i.alternateText}</h4> : <></>}
                    </div>
                  </SplideSlide>
                );
              })}
          </Splide>
        </div>
      </div>
    </>
  );
};

export default List;
