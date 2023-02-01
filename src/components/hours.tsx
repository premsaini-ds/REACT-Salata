import * as React from "react";

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

  for (let [k, v, i = 0] of Object.entries(sortByDay(week))) {
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

function convertTo12HourFormat(time: string, includeMeridiem: boolean): string {
  const timeParts = time.split(":");
  let hour: any = Number(timeParts[0]);
  const minutesString = timeParts[1];
  const meridiem = hour < 12 || hour === 24 ? "" : ""; // Set AM/PM
  hour = hour % 24 || 24; // Adjust hours
  if (hour == 24) {
    return "00.00";
  }
  if (hour < 10) {
    hour = "0" + hour;
    return (
      hour.toString() + ":" + minutesString + (includeMeridiem ? meridiem : "")
    );
  } else {
    return (
      hour.toString() + ":" + minutesString + (includeMeridiem ? meridiem : "")
    );
  }
}

type DayRow = {
  dayName: string;
  day: Day;
  isToday?: boolean;
  delKey: string;
  delDayName: string;
  delDay: Day;
  delIsToday?: boolean;
};

const DayRow = (props: DayRow) => {
  const { dayName, day, isToday, delKey, delDayName, delDay, delIsToday } =
    props;

  return (
    <div className={`${isToday ? "currentDay" : ""} time-row`}>
      <div className="capitalize day">{dayName}</div>
      <div className="store-times">
        {day && !day.isClosed ? (
          <>
            <div className="store-time">
              {convertTo12HourFormat(day.openIntervals[0].start, true)}
            </div>
            <div className="store-time">-</div>
            <div className="store-time">
              {convertTo12HourFormat(day.openIntervals[0].end, true)}
            </div>
          </>
        ) : (
          <div className="store-time closed">
            <span>Closed</span>
          </div>
        )}

        {delDay && !delDay.isClosed ? (
          <>
            <div className="store-time">
              {convertTo12HourFormat(delDay.openIntervals[0].start, true)}

              <div className="store-time">-</div>
              <div className="store-time">
                {convertTo12HourFormat(delDay.openIntervals[0].end, true)}
              </div>
            </div>
          </>
        ) : (
          <>
            {Object.keys(delDay).length > 0 ? (
              <div className="store-time closed">
                <span>Closed</span>
              </div>
            ) : (
              <></>
            )}
          </>
        )}
      </div>
    </div>
  );
};

const Hours = (props: Hours) => {
  const { title, hours, deliveryHours, timezone } = props;

  return (
    <>
      <div className="box store-timing">
        <div className="inner-box">
          <h4>Store Timing</h4>
          <div className="hours">
            <div className="time-row">
              <div className="day"></div>

              {Object.keys(props.deliveryHours).length > 0 ? (
                <div className="delivery-time">Delivery</div>
              ) : (
                <></>
              )}
            </div>
            {renderHours(hours, deliveryHours)}
          </div>
        </div>
      </div>
    </>
  );
};

export default Hours;
