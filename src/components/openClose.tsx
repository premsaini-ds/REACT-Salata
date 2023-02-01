import * as React from "react";
import { timeZone } from "../constants";

type Hours = {
  title?: string;
  hours: Week;
  deliveryHours: any;
  children?: React.ReactNode;
  timezone?: any;
};

interface Week extends Record<string, any> {
  monday?: Day;
  tuesday?: Day;
  wednesday?: Day;
  thursday?: Day;
  friday?: Day;
  saturday?: Day;
  sunday?: Day;
}

type Day = {
  isClosed: boolean;
  openIntervals: OpenIntervals[];
};

type OpenIntervals = {
  start: string;
  end: string;
};
var nextDay: any = null;
var nextDayName: any = null;
var openDays: any = [];

const todayIndex = new Date().getDay();

/**
 * Dynamically creates a sort order based on today's day.
 */
function getSorterForCurrentDay(): { [key: string]: number } {
  const dayIndexes = [0, 1, 2, 3, 4, 5, 6];

  const updatedDayIndexes = [];
  for (let i = 0; i < dayIndexes.length; i++) {
    let dayIndex = dayIndexes[i];
    if (dayIndex - todayIndex >= 0) {
      dayIndex = dayIndex - todayIndex;
    } else {
      dayIndex = dayIndex + 7 - todayIndex;
    }
    updatedDayIndexes[i] = dayIndex;
  }

  return {
    sunday: updatedDayIndexes[0],
    monday: updatedDayIndexes[1],
    tuesday: updatedDayIndexes[2],
    wednesday: updatedDayIndexes[3],
    thursday: updatedDayIndexes[4],
    friday: updatedDayIndexes[5],
    saturday: updatedDayIndexes[6],
  };
}

const defaultSorter: { [key: string]: number } = {
  sunday: 0,
  monday: 1,
  tuesday: 2,
  wednesday: 3,
  thursday: 4,
  friday: 5,
  saturday: 6,
};

function sortByDay(week: Week): Week {
  const tmp = [];
  for (const [k, v] of Object.entries(week)) {
    tmp[getSorterForCurrentDay()[k]] = { key: k, value: v };
  }

  const orderedWeek: Week = {};
  tmp.forEach((obj) => {
    orderedWeek[obj.key] = obj.value;
  });

  return orderedWeek;
}
var data: any = [];

const renderHours = (week: Week, deliveryHours: any) => {
  const dayDom: JSX.Element[] = [];
  const deliverDayDom: JSX.Element[] = [];
  let sortDeliveryHours = sortByDay(deliveryHours);
  let allDays = Object.entries(sortByDay(week));

  for (let [k, v] of allDays) {
    if (!v.isClosed) {
      openDays.push({ key: k, openIntervals: v.openIntervals });
    }
  }

  for (let [k, v, i = 0] of allDays) {
    i++;
    let delTime: any = "";
    let delk: any = "";
    for (let [dk, dv] of Object.entries(sortDeliveryHours)) {
      if (dk == k) {
        delTime = dv;
        delk = dk;
      }
    }

    dayDom.push(
      <DayRow
        key={k}
        dayName={k}
        day={v}
        isToday={isDayToday(k)}
        delKey={delk}
        delDayName={delk}
        delDay={delTime}
        delIsToday={isDayToday(delk)}
      />
    );
  }

  return <>{dayDom}</>;
};

function isDayToday(dayName: string) {
  return defaultSorter[dayName] === todayIndex;
}

type DayRow = {
  dayName: string;
  day: Day;
  isToday?: boolean;
  delKey: string;
  delDayName: string;
  delDay: Day;
  delIsToday?: boolean;
  key: any;
};

const DayRow = (props: DayRow) => {
  const { dayName, day, isToday, delKey, delDayName, delDay, delIsToday } =
    props;
  var nextday: any = null;

  const date = new Date();
  var status = null;
  if (!props.day.isClosed) {
    if (
      props?.day.openIntervals[0].start >
      date.toLocaleString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: timeZone,
      })
    ) {
      if (props.isToday == true) {
        status = (
          <div className="store-phone">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              width="23.987"
              height="23.987"
            >
              {" "}
              <path
                d="M256 512C114.6 512 0 397.4 0 256S114.6 0 256 0S512 114.6 512 256s-114.6 256-256 256zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"
                fill="#008661"
              />
            </svg>
            <span>Closed</span> -{" "}
            <span>Opens at {props.day?.openIntervals[0].start} </span>
          </div>
        );
      }
    } else {
      if (
        props.isToday == true ||
        props.day?.openIntervals[0].start ==
          date.toLocaleString("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
            timeZone: timeZone,
          })
      ) {
        status = (
          <div className="store-phone">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              width="23.987"
              height="23.987"
            >
              {" "}
              <path
                d="M256 512C114.6 512 0 397.4 0 256S114.6 0 256 0S512 114.6 512 256s-114.6 256-256 256zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"
                fill="#008661"
              />
            </svg>
            <span>Open</span> -{" "}
            <span>Closes at {props.day?.openIntervals[0].end} </span>
          </div>
        );
      }
    }
  } else {
    if (props.isToday == true) {
      status = openDays.length ? (
        <div className="store-phone">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            width="23.987"
            height="23.987"
          >
            {" "}
            <path
              d="M256 512C114.6 512 0 397.4 0 256S114.6 0 256 0S512 114.6 512 256s-114.6 256-256 256zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"
              fill="#008661"
            />
          </svg>
          <span>CLOSED</span> -{" "}
          <span>
            OPENS ON {openDays[0].key} at {openDays[0].openIntervals[0].start}
          </span>
        </div>
      ) : (
        <>
          <strong>
            <span>CLOSED</span>
          </strong>
        </>
      );
    }
  }

  return <>{status}</>;
};

const OpenClose = (props: Hours) => {
  const { title, hours, deliveryHours, timezone } = props;

  return (
    <>
      {props.hours && props.hours.reopenDate ? (
        <span>Temp Closed</span>
      ) : (
        <> {renderHours(hours, deliveryHours)}</>
      )}
    </>
  );
};

export default OpenClose;
