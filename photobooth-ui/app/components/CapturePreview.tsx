import { useEffect, useState } from "react";
import { usePhotoboothStatus } from "./PhotoboothStateProvider";

import yetiLove1 from "~/images/yeti-love-1-removebg-preview.png";
import yetiLove2 from "~/images/yeti-love-2-removebg-preview.png";
import yetiLove3 from "~/images/yeti-love-3-removebg-preview.png";
import yetiPeek1 from "~/images/yeti-peek-1-bg.png";
import yetiPeek2 from "~/images/yeti-peek-2-bg.png";

const YETI_PEEK_NUM = 5;
const YETI_PEEK_RETRY = 100;

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

type PeekYetiMetaType = {
  index: number;
  previousIndicies: Array<number>;
};

export default function CapturePreview({
  lastImg,
}: {
  lastImg: string | undefined;
}) {
  const status = usePhotoboothStatus();
  const initialRand = getRandomInt(YETI_PEEK_NUM);

  const initialState: PeekYetiMetaType = {
    index: -1,
    previousIndicies: [initialRand],
  };

  const [peekYetiMeta, setPeekYetiMeta] =
    useState<PeekYetiMetaType>(initialState);

  const isCapturePreview = status === "capturePreview";

  useEffect(() => {
    if (isCapturePreview || status === "captureFlash") {
      console.group("CapturePreview useEffect");
      setPeekYetiMeta((prev) => {
        for (let i = 0; i < YETI_PEEK_RETRY; i++) {
          const rand = getRandomInt(5);
          console.log({ rand, prev });

          if (prev.previousIndicies.includes(rand)) {
            console.log("--try again");
            continue;
          }
          const newIndiciesTemp = [...prev.previousIndicies, rand];
          const newIndicies =
            newIndiciesTemp.length === 4 ? [rand] : newIndiciesTemp;
          console.log({ newIndicies });
          return {
            index: rand,
            previousIndicies: newIndicies,
          };
        }
        console.log("### giving up");
        return prev;
      });
      console.groupEnd();
    }
  }, [status, isCapturePreview]);

  const { index } = peekYetiMeta;

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
        {index === 3 && (
          <div className="grid z-20 col-start-1 col-span-1 row-start-2 row-span-1 justify-center items-center">
            <img src={yetiPeek1} className="ml-[58px]" />
          </div>
        )}
        {index === 4 && (
          <div className="grid z-20 col-start-3 col-span-3 row-start-1 row-span-3 justify-center items-center">
            <img src={yetiPeek2} className="max-h-[400px] ml-[120px]" />
          </div>
        )}
      </>
    );
  }
  return <></>;
}
