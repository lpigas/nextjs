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
    <div
      style={{
        backgroundImage: `url("https://pngroyale.com/wp-content/uploads/2022/03/Vector-Clock-PNG-Image.png"), url("https://freepngimg.com/thumb/logo/69920-logo-sticker-paper-king-free-png-hq-thumb.png"), radial-gradient(
      circle,
      rgb(0, 0, 0) 4%,
      rgb(50, 4, 255) 18%,
      rgb(255, 255, 255) 38%
    )`,
        backgroundSize: "contain, 50%",
      }}
      className="box-border w-96 h-96 flex justify-center items-center m-auto rounded-full shadow-lg  shadow-cyan-700/100"
    >
      <div className="flex justify-center z-[999] items-center border-4 rounded-full w-1 h-1 before:absolute ">
        {""}
        <div className="z-[3] absolute w-36 h-36 bg-slate-600 rounded-full">
        {""}
          <div
            className="Menu__block-clock--hours"
            id="hour"
            style={degHour}
          ></div>
        </div>
        <div className="z-[2] absolute w-56 h-56 bg-red-600 rounded-full">
          <div
            className="Menu__block-clock--minutes"
            id="minute"
            style={degMinutes}
          ></div>
        </div>
        <div className=" z-[1] absolute w-72 h-72 bg-green-600 rounded-full">
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
