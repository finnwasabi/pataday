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

/**
 * Generates a countdown component that displays the remaining time in days, hours, minutes, and seconds.
 *
 * @param {Object} props - The properties for the countdown component.
 * @param {boolean} props.isShowingZeroPad - Determines whether to show zero-padding for the time values.
 * @param {Date} props.date - The target date for the countdown. If not provided, the countdown will start from the current date plus one day.
 * @param {string} props.className - The CSS class name for the countdown component.
 * @param {string} props.classNameTimer - The CSS class name for the timer section of the countdown component.
 * @param {string} props.classNameLabel - The CSS class name for the label section of the countdown component.
 * @param {number} props.breakPoint - The breakpoint value for the media query. Determines the maximum width at which the countdown component should switch to a smaller layout.
 * @param {string[]} props.hidden - An array of strings representing the time units (days, hours, minutes, seconds) that should be hidden in the countdown component. ['d', 'h', 'm', 's']. Default is [].
 * @return {JSX.Element} The countdown component.
 */
function Countdown({
  isShowingZeroPad = true,
  date,
  className,
  classNameTimer,
  classNameLabel,
  breakPoint: breakPointProp,
  hidden = [],
}) {
  const d = date || new Date().getTime() + 1 * 24 * 60 * 60 * 1000;
  const breakPoint = useMediaQuery(`(max-width: ${breakPointProp}px)`);

  return (
    <CountdownComponent
      date={d}
      renderer={({ minutes, seconds, days, hours }) => {
        const getDate = (renderTime) =>
          isShowingZeroPad ? zeroPad(renderTime) : renderTime;

          let data = [
            { date: getDate(days), label: "days", labelShort: "d", hidden: hidden.includes('d') },
            { date: getDate(hours), label: "hours", labelShort: "h", hidden: hidden.includes('h') },
            { date: getDate(minutes), label: "minutes", labelShort: "m", hidden: hidden.includes('m') },
            { date: getDate(seconds), label: "seconds", labelShort: "s", hidden: hidden.includes('s') },
          ];

        let hasNonZeroValue = false;

        const newData = [...data].filter((item) => {
          if (+item.date !== 0) hasNonZeroValue = true;
          if (hasNonZeroValue) return true;
          return false;
        })


        return (
          <CountdownRender
            breakPoint={breakPoint}
            className={className}
            classNameTimer={classNameTimer}
            classNameLabel={classNameLabel}
            data={newData}
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
  hidden: PropTypes.arrayOf(PropTypes.string),
};

export default React.memo(Countdown);