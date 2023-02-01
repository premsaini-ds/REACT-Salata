import * as React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
type c_foodItems = {
  prop: any;
};
var style = {
  width: "310px",
  height: "310px",
};
const FavoriteFood = (foodItem: c_foodItems) => {
  return (
    <>
      <div className="food-list bg-light">
        <div className="container">
          <div className="w-full text-center">
            <h3 className="sec_heading">Favourite Favorites</h3>
          </div>

          <Splide
            options={{
              rewind: false,

              type: "loop",

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
                  type: "loop",
                },
                575: {
                  perPage: 1,
                  padding: "45px",
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
                        src={i.image ? i.image.url : ""}
                        className="block"
                        alt={i.description}
                        title={i.description}
                      />
                      <h4>{i.description ? i.description : ""}</h4>
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

export default FavoriteFood;
