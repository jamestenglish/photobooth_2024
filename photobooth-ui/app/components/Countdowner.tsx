import { useEffect, useState } from "react";
import { StatusType } from "./WebCamContainer";

export default function Countdowner({
  status,
  onCountdownFinished,
}: {
  status: StatusType;
  onCountdownFinished: () => void;
}) {
  const [countdown, setCountdown] = useState<number>(3);

  useEffect(() => {
    let id: NodeJS.Timeout;
    if (status === "countdown") {
      id = setTimeout(() => {
        const newCountdown = countdown - 1;
        if (newCountdown === 0) {
          onCountdownFinished();
          setCountdown(3);
        } else {
          setCountdown(newCountdown);
        }
      }, 1000);
    }
    return () => {
      if (id !== undefined) {
        clearTimeout(id);
      }
    };
  }, [status, countdown, onCountdownFinished]);

  if (status !== "countdown") {
    return <></>;
  }

  return <span>{countdown}</span>;
}
