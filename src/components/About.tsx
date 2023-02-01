import * as React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { Link } from "@yext/pages/components";
type c_foodItems = {
  prop: any;
  prop2: any;
  prop3:any;
  CtaButton: any;
};
var style = {
  width: "100%",
  height: "310px",
};


const AboutSection = (foodItem: c_foodItems) => {

  return (
    <>
      <div className="about-sec">
        <div className="container-custom mx-auto flex flex-wrap">
          <div className="w-full lg:w-2/5 xl:w-[47%] relative lg:h-full">
            <div
              id="splide"
              className="splide lg:-mx-[15px] h-full splide--slide splide--ltr splide--draggable is-active is-initialized"
              role="region"
              aria-roledescription="carousel"
            >
              <div
                className="splide__track h-full splide__track--slide splide__track--ltr splide__track--draggable"
                id="splide-track"
                style={{ paddingLeft: "0px", paddingRight: "0px" }}
                aria-live="polite"
                aria-atomic="true"
              >
                <Splide
                  options={{
                    rewind: false,

                    type: "loop",

                    perPage: 1,
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
                              style={style}
                              src={i.url ? i.url : ""}
                              className="block"
                              alt={i.description}
                              title={i.description}
                            />
                          </div>
                        </SplideSlide>
                      );
                    })}
                </Splide>
              </div>
            </div>
          </div>
          <div className="w-full overflow-hidden overflow-visible lg:w-3/5 xl:w-[50.6%] about-content ml-auto">
            <b>{foodItem.prop3}</b>
            <p>{foodItem.prop2}</p>
            {foodItem.CtaButton &&
            foodItem.CtaButton.label &&
            foodItem.CtaButton &&
            foodItem.CtaButton.link ? (
              <div className="cta_btn">
                <Link
                  rel="noopener noreferrer"
                  eventName={`AboutCtaButton`}
                  data-ya-track="AboutCtaButton"
                  href={
                    foodItem.CtaButton && foodItem.CtaButton.link
                      ? foodItem.CtaButton.link
                      : "#"
                  }
                  className="button"
                >
                  {foodItem.CtaButton && foodItem.CtaButton.label
                    ? foodItem.CtaButton.label
                    : ""}
                </Link>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutSection;
