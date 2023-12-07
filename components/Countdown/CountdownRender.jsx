// CountdownRender.jsx
import React from "react";

function CountdownRender({
  data = [
    { date: "00", label: "days", labelShort: "d" },
    { date: "00", label: "hours", labelShort: "h" },
    { date: "00", label: "minutes", labelShort: "m" },
    { date: "00", label: "seconds", labelShort: "s" },
  ],
  className,
  classNameTimer,
  classNameLabel,
  breakPoint,
}) {
  let hasNonZeroValue = false;

  return data.map((item) => {
    const countdownValue = parseInt(item.date, 10);

    if (countdownValue !== 0) {
      hasNonZeroValue = true;
    }

    if (hasNonZeroValue) {
      return (
        <p key={item.label} className={className}>
          <span className={classNameTimer}>{item.date}</span>
          <span className={classNameLabel}>
            {breakPoint ? item.labelShort : item.label}
          </span>
        </p>
      );
    }

    return (
      <p key={item.label} className={className} style={{ display: "none" }} />
    );
  });
}

export default CountdownRender;