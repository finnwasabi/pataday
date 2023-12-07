// index.jsx
// This component should be import by dynamic import because
// Because it is timer component, so server timer is different in client
// => Component will be error in client because hydration

"use client";

import React from "react";
import CountdownComponent, { zeroPad } from "react-countdown";
import PropTypes from "prop-types";
import { useMediaQuery } from "usehooks-ts";

import CountdownRender from "./CountdownRender";

function Countdown({
  isShowingZeroPad = true,
  date,
  className,
  classNameTimer,
  classNameLabel,
  breakPoint: breakPointProp,
}) {
  const d = date || new Date().getTime() + 1 * 24 * 60 * 60 * 1000;
  const breakPoint = useMediaQuery(`(max-width: ${breakPointProp}px)`);

  return (
    <CountdownComponent
      date={d} // Next: 30 days}
      renderer={({ minutes, seconds, days, hours }) => {
        const getDate = (renderTime) =>
          isShowingZeroPad ? zeroPad(renderTime) : renderTime;

        let data = [
          { date: getDate(days), label: "days", labelShort: "d" },
          { date: getDate(hours), label: "hours", labelShort: "h" },
          { date: getDate(minutes), label: "minutes", labelShort: "m" },
          { date: getDate(seconds), label: "seconds", labelShort: "s" },
        ];

        return (
          <CountdownRender
            breakPoint={breakPoint}
            className={className}
            classNameTimer={classNameTimer}
            classNameLabel={classNameLabel}
            data={data}
          />
        );
      }}
    />
  );
}

Countdown.propTypes = {
  isShowingZeroPad: PropTypes.bool,
  date: PropTypes.number,
  className: PropTypes.string,
  classNameTimer: PropTypes.string,
  classNameLabel: PropTypes.string,
  breakPoint: PropTypes.number,
};

export default React.memo(Countdown);