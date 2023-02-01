import * as React from "react";

type Cta = {
  buttonText: string;
  latitude?: number;
  longitude?: number;
};

const GetDirection = (props: GetDirection) => {
  const { buttonText, latitude, longitude } = props;

  const GetDirectionUrl = () => {
    var getDirectionUrl =
      "https://www.google.com/maps/dir/?api=1&destination=" +
      latitude +
      "," +
      longitude;

    navigator.geolocation.getCurrentPosition(function (position) {
      let currentLatitude = position.coords.latitude;
      let currentLongitude = position.coords.longitude;
      let getDirectionUrl =
        "https://www.google.com/maps/dir/?api=1&destination=" +
        latitude +
        "," +
        longitude +
        "&origin=" +
        currentLatitude +
        "," +
        currentLongitude;
      window.open(getDirectionUrl, "_blank");
    });
  };

  return (
    <a
      onClick={GetDirectionUrl}
      className="direction"
      href="javascript:void(0);"
      rel="noopener noreferrer"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path d="M0,0H24V24H0Z" fill="none" />
        <path
          d="M22.43,10.59,13.42,1.58a2.051,2.051,0,0,0-2.83,0l-9,9a1.992,1.992,0,0,0,0,2.82l9,9a2,2,0,0,0,2.82,0l8.99-8.99A1.992,1.992,0,0,0,22.43,10.59ZM12.01,20.99l-9-9,9-9,9,9ZM8,11v4h2V12h4v2.5L17.5,11,14,7.5V10H9A1,1,0,0,0,8,11Z"
          fill="#fff"
        />
      </svg>{" "}
      {buttonText}
    </a>
  );
};

export default GetDirection;
