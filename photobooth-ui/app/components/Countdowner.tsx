import { useEffect, useState } from "react";
import { StatusType } from "~/hooks/usePhotoboothState";
import { SCREEN_WIDTH, COUNTDOWN_TIME_IN_MS } from "~/constants";
import { usePhotoboothStatus } from "./PhotoboothStateProvider";

export default function Countdowner({
  onCountdownFinished,
}: {
  onCountdownFinished: () => void;
}) {
  const status = usePhotoboothStatus();

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
      }, COUNTDOWN_TIME_IN_MS);
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

  return (
    <div className="grid z-10 col-start-1 col-span-3 row-start-1 row-span-2 justify-center items-center">
      <span
        style={{
          fontSize: "16rem",
          animation: "ping 1.2s cubic-bezier(0, 0, 0.2, 1) infinite",
        }}
        className="animate-ping mountains-of-christmas-bold drop-shadow-[0_3px_3px_rgba(0,0,0,0.8)] text-white text-outline"
      >
        {countdown}
      </span>
    </div>
  );
}
