import * as React from "react";

import { Link } from "@yext/pages/components";

export type Address = {
  line1: string;
  city: string;
  region: string;
  postalCode: string;
  countryCode: string;
};
type props = {
  Name: any;
  TagLine: any;
  BackgroundImage: any;
  CtaButton: any;
  text: any;
  template: any;
};
type Banner = {
  name?: string;
  address?: Address;
  openTime?: string;
  children?: React.ReactNode;
};

const Banner = (Data: props) => {
  const conversionDetails_primaryCTA = {
    cid: "dc6937a6-345d-4c0f-b63f-79be3c29d7bc",
    cv: "3",
  };

  return (
    <>
      <div className="hero">
        <img
          className="hero-img"
          src={
            Data.BackgroundImage
              ? Data.BackgroundImage
              : "https://webapi.salata.com/wp-content/uploads/2019/08/hero-menu@2x.png"
          }
          alt="banner"
          title="banner"
        />
        <div className="container text-center">
          <h2>{Data.Name ? Data.Name : ""}</h2>
          <h2>{Data.TagLine ? Data.TagLine : ""}</h2>
          {Data.CtaButton &&
          Data.CtaButton.label &&
          Data.CtaButton &&
          Data.CtaButton.link ? (
            <div className="cta_btn">
              <Link
                data-ya-track="cta_button"
                eventName={Data.CtaButton.label}
                rel="noopener noreferrer"
                conversionDetails={conversionDetails_primaryCTA}
                href={Data.CtaButton ? Data.CtaButton.link : "#"}
                className="button"
              >
                {Data.CtaButton && Data.CtaButton.label
                  ? Data.CtaButton.label
                  : ""}
              </Link>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};

export default Banner;
