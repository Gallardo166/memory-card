import { useEffect, useState } from "react";

export default function Timer({ handleChangeStatus, handleChangeClickedIds, startTime }) {
  const [time, setTime] = useState(startTime);
  const dialog = document.querySelector("dialog");

  useEffect(() => {
    const interval = setInterval(() => {
      if (time === 0) {
        handleChangeClickedIds();
        handleChangeStatus("lose");
        dialog.showModal();
        return
      }
      setTime(time - 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [time]);

  return <p className="timer">{time}</p>;
}
