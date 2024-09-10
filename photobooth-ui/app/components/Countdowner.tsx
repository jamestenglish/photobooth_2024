import { useEffect, useState } from "react";
import { StatusType } from "~/hooks/usePhotoboothState";
import { SCREEN_WIDTH, COUNTDOWN_TIME_IN_MS } from "constants/sizes";

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
    <div
      style={{ fontSize: "16rem", maxWidth: `${SCREEN_WIDTH}px` }}
      className="my-16 flex absolute justify-center z-10 font-serif w-full"
    >
      <span
        style={{ animation: "ping 1.2s cubic-bezier(0, 0, 0.2, 1) infinite" }}
        className="relative inline-flex drop-shadow-[0_3px_3px_rgba(0,0,0,0.8)] text-white relative mx-auto"
      >
        {countdown}
      </span>
    </div>
  );
}
