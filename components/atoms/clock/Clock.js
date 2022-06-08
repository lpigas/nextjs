import React, { useEffect, useState } from "react";

export default function clock() {
  const [degHour, setDegHour] = useState({});
  const [degMinutes, setDegMinutes] = useState({});
  const [degSeconds, setDegSeconds] = useState({});
  useEffect(() => {
    const timer = setInterval(() => {
      const getDate = new Date();
      let hours = getDate.getHours() * 30;
      let minutes = getDate.getMinutes() * 6;
      let seconds = getDate.getSeconds() * 6;
      setDegSeconds({ transform: `rotateZ(${seconds}deg)` });
      setDegMinutes({ transform: `rotateZ(${minutes + seconds / 60}deg)` });
      setDegHour({ transform: `rotateZ(${hours + minutes / 12}deg)` });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="Menu__block-clock--Body">
      <div className="Menu__block-clock">
        <div className="Menu__block-clock--hour">
          <div
            className="Menu__block-clock--hours"
            id="hour"
            style={degHour}
          ></div>
        </div>
        <div className="Menu__block-clock--minute">
          <div
            className="Menu__block-clock--minutes"
            id="minute"
            style={degMinutes}
          ></div>
        </div>
        <div className="Menu__block-clock--second">
          <div
            className="Menu__block-clock--seconds"
            id="second"
            style={degSeconds}
          ></div>
        </div>
      </div>
    </div>
  );
}
