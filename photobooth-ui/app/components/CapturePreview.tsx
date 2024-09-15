import { useEffect, useState } from "react";
import { usePhotoboothStatus } from "./PhotoboothStateProvider";

import yetiLove1 from "~/images/yeti-love-1-removebg-preview.png";
import yetiLove2 from "~/images/yeti-love-2-removebg-preview.png";
import yetiLove3 from "~/images/yeti-love-3-removebg-preview.png";

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

export default function CapturePreview({
  lastImg,
}: {
  lastImg: string | undefined;
}) {
  const status = usePhotoboothStatus();

  const [index, setIndex] = useState<number>(0);

  const isCapturePreview = status === "capturePreview";

  useEffect(() => {
    if (isCapturePreview) {
      setIndex((prev) => {
        for (let i = 0; i < 10; i++) {
          const rand = getRandomInt(3);
          console.log({ rand, prev });

          if (rand === prev) {
            continue;
          }
          return rand;
        }
        return prev;
      });
    }
  }, [status, isCapturePreview]);

  if (isCapturePreview && lastImg !== undefined) {
    return (
      <>
        <div className="grid z-10 col-start-1 col-span-3 row-start-1 row-span-3 justify-center items-center bg-white">
          <img src={lastImg} className="my-auto" />
        </div>
        {index === 0 && (
          <div className="grid z-20 col-start-1 col-span-1 row-start-2 row-span-1 justify-center items-center">
            <img src={yetiLove1} className="ml-16" />
          </div>
        )}

        {index === 1 && (
          <div className="grid z-20 col-start-3 col-span-1 row-start-2 row-span-1 justify-center items-center">
            <img src={yetiLove2} className="my-auto" />
          </div>
        )}

        {index === 2 && (
          <div className="mt-40 grid z-20 col-start-2 col-span-2 row-start-1 row-span-3 justify-center items-center">
            <img src={yetiLove3} className="ml-36" />
          </div>
        )}
      </>
    );
  }
  return <></>;
}
