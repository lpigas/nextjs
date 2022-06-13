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
      setDegSeconds({ transformOrigin: '50% 100%', transform: `rotateZ(${seconds}deg)` });
      setDegMinutes({ transformOrigin: '50% 100%',transform: `rotateZ(${minutes + seconds / 60}deg)` });
      setDegHour({ transformOrigin: '50% 100%', transform: `rotateZ(${hours + minutes / 12}deg)` });
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
      className={`box-border z-[3] w-96 h-96 flex justify-center items-center m-auto rounded-full shadow-lg  shadow-cyan-700/100 before:absolute`}
    >
      <div className="absolute flex  items-center  w-0 h-0 ">
        {""}
        <div className="before:absolute w-40 h-40 justify-center before:justify-center rounded-full items-center ">
          {""}
          <div
            className="absolute  before:flex flex before:content-[''] w-3 h-24 bg-green-500 before:absolute z-[0] bottom-0 "
            id="hour"
            style={degHour}
          ></div>
        </div>
        <div className="before:absolute w-10 h-10 before:justify-center justify-center before:flex flex rounded-full items-center bottom-4">
          {""}
          <div
            className="absolute flex before:content-[''] w-6 h-6 bg-white before:absolute z-[8]  rounded-full "

          ></div>
        </div>

        <div className="before:absolute w-56 h-56 rounded-full before:flex flex justify-center before:items-center ">
          <div
            className="absolute before:flex  before:content-[''] w-2 h-32 bg-blue-500 before:absolute z-[1] bottom-0 "
            id="minute"
            style={degMinutes}
          ></div>
        </div>
        <div className="before:absolute w-72 h-72 rounded-full before:flex flex justify-center before:items-center ">
          <div
            className="absolute before:flex before:content-[''] w-1 h-40 bg-red-500 before:absolute z-[2] bottom-0 "
            id="second"
            style={degSeconds}
          ></div>
        </div>
      </div>
    </div>
  );
}
