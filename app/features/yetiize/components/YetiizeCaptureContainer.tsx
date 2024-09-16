import { useRef, useState, useEffect, Dispatch, useCallback } from "react";
import { processImage } from "../helpers/process.client";
import {
  usePhotoboothImages,
  usePhotoboothStateMethods,
  usePhotoboothStatus,
} from "~/features/photobooth-state/components/PhotoboothStateProvider";
import { YETIS } from "~/constants";
import icon1 from "~/images/yeti-cameria-icon-1-removebg-preview.png";
import icon2 from "~/images/yeti-camera-icon-2-removebg-preview.png";
import icon3 from "~/images/yeti-camera-icon-3-removebg-preview.png";

import sadIcon1 from "~/images/sad-yeti-icon-1.png";
import sadIcon2 from "~/images/sad-yeti-icon-2.png";
import sadIcon3 from "~/images/sad-yeti-icon-3.png";
import { ActionsType } from "~/features/photobooth-state/hooks/usePhotoboothState";

const icons = [icon1, icon2, icon3];
const sadIcons = [sadIcon1, sadIcon2, sadIcon3];

const proccessImageBg = async ({
  src,
  index,
  photoboothStateDispatch,
}: {
  photoboothStateDispatch: Dispatch<ActionsType>;
  index: number;
  src: string;
}) => {
  try {
    const resultFile = await processImage({
      imageBase64Url: src,
      name: `${index}`,
    });

    const b64 = URL.createObjectURL(resultFile);

    photoboothStateDispatch({
      type: "yetiizeFinish",
      payload: { imgSrc: b64, index },
    });
  } catch (err) {
    // TODO JTE handle error
    photoboothStateDispatch({
      type: "yetiizeFinish",
      payload: { imgSrc: "error", index },
    });
  }
};

export default function YetiizeCaptureContainer({
  src,
  index,
  bgImgSrc,
}: {
  src: string;
  index: number;
  bgImgSrc: string;
}) {
  const { photoboothStateDispatch } = usePhotoboothStateMethods();
  const { yetiBgIndicies } = usePhotoboothImages();
  const yetiBgIndex = yetiBgIndicies[index];

  const status = usePhotoboothStatus();
  const isBgEmpty = bgImgSrc.length === 0;
  const doesBgMatch = bgImgSrc === src && !isBgEmpty;

  const [timerIds, setTimerIds] = useState<Array<NodeJS.Timeout>>([]);

  useEffect(() => {
    return () => {
      timerIds.forEach((id) => {
        if (id) {
          clearTimeout(id);
        }
      });
    };
  }, []);

  const onClickYetiize = useCallback(async () => {
    if (status === "yetiizeReady") {
      if (doesBgMatch) {
        photoboothStateDispatch({ type: "shuffleYetiBgIndex", payload: index });
      } else {
        if (isBgEmpty) {
          photoboothStateDispatch({ type: "yetiizeStart" });

          const id = setTimeout(async () => {
            await proccessImageBg({
              src,
              index,
              photoboothStateDispatch,
            });
          }, 1000);

          setTimerIds((prev) => {
            return [...prev, id];
          });
        } else {
          photoboothStateDispatch({ type: "setBgImg", payload: index });
        }
      }
    }
  }, [
    doesBgMatch,
    isBgEmpty,
    proccessImageBg,
    index,
    photoboothStateDispatch,
    status,
  ]);

  const onClickUnYetiize = useCallback(async () => {
    if (status === "yetiizeReady" && doesBgMatch && !isBgEmpty) {
      photoboothStateDispatch({ type: "setOrigImg", payload: index });
    }
  }, [doesBgMatch, isBgEmpty, index, status]);

  return (
    <div className="flex flex-col gap-6 items-center mt-6">
      <div className="grid grid-col-1 grid-row-1">
        <div className="row-start-1 col-start-1 max-h-[316px] max-w-[424px] overflow-hidden">
          <img
            className="preview-img object-fill max-w-full"
            src={YETIS[yetiBgIndex]}
          />
        </div>
        <img
          className="border-2 border-dkblue preview-img object-scale-down row-start-1 col-start-1 "
          src={src}
        />
      </div>

      <button
        disabled={status !== "yetiizeReady"}
        onClick={onClickYetiize}
        className="disabled:cursor-not-allowed disabled:hover:bg-gray-200 disabled:text-gray-400 disabled:border-gray-400 disabled:bg-gray-300 inline-flex items-center mt-12 text-5xl py-4 px-6 border-4 text-dkblue border-dkblue hover:bg-ltblue rounded-3xl mountains-of-christmas-bold"
      >
        <img
          src={icons[index]}
          alt="yeti icon"
          className="fill-current w-14 h-14 mr-2"
        />
        <span>Yeti-ize!</span>
      </button>
      {doesBgMatch && (
        <button
          onClick={onClickUnYetiize}
          className="inline-flex items-center align-center content-center text-3xl  py-2 px-4 border-4 text-pastel border-pastel hover:bg-ltblue hover:text-dkblue rounded-3xl mountains-of-christmas-bold"
        >
          <img
            src={sadIcons[index]}
            alt="yeti icon"
            className="fill-current w-12 h-12 mr-2"
          />
          <span>Un-Yeti</span>
        </button>
      )}
    </div>
  );
}
