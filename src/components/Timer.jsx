import { useEffect, useState } from "react";

export default function Timer({ handleChangeStatus, startTime }) {
  const [time, setTime] = useState(startTime);

  useEffect(() => {
    const interval = setInterval(() => setTime(time - 1), 1000);

    return () => {
      clearInterval(interval);
    };
  }, [time]);

  if (time === 0) {
    handleChangeStatus("lose");
  }

  return <div className="timer">{time}</div>;
}
