import { useState, useEffect, Dispatch, useCallback } from "react";
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
import { useFetcher } from "@remix-run/react";

const icons = [icon1, icon2, icon3];
const sadIcons = [sadIcon1, sadIcon2, sadIcon3];

import { action } from "~/routes/_index";

export default function YetiizeCaptureContainer({
  imgSrc,
  index,
  bgRemovedImgSrc,
}: {
  imgSrc: string;
  index: number;
  bgRemovedImgSrc: string;
}) {
  const { photoboothStateDispatch } = usePhotoboothStateMethods();
  const { yetiBgIndicies, origImages } = usePhotoboothImages();
  const yetiBgIndex = yetiBgIndicies[index];
  const origImg = origImages[index];

  const status = usePhotoboothStatus();
  const isBgRemovedImgEmpty = bgRemovedImgSrc.length === 0;
  const doesBgRemovedMatchSrc =
    bgRemovedImgSrc === imgSrc && !isBgRemovedImgEmpty;

  const fetcher = useFetcher<typeof action>();
  const { state, data } = fetcher;
  const imgBgRemovedSrcResult = data?.imgBgRemovedSrcResult ?? "";
  const formResultIndex = data?.index ?? `${index}`;

  useEffect(() => {
    console.group("YetiizeCaptureContainer useEffect");
    console.log(
      `formResultIndex: ${formResultIndex} | isBgRemovedImgEmpty: ${isBgRemovedImgEmpty} | state: ${state} | status: ${status} | imgBgRemovedSrcResult: ${imgBgRemovedSrcResult?.length}`
    );

    console.log(
      `1: ${formResultIndex === `${index}`} | 2: ${isBgRemovedImgEmpty} | 3: ${state === "submitting"} | 4: ${
        status === "yetiizeStart" &&
        state === "idle" &&
        imgBgRemovedSrcResult !== ""
      }`
    );
    if (formResultIndex === `${index}`) {
      console.log("data", data);
      if (isBgRemovedImgEmpty) {
        if (state === "submitting") {
          console.log("dispatch yetiizeStart");
          photoboothStateDispatch({ type: "yetiizeStart" });
        } else if (
          status === "yetiizeStart" &&
          state === "idle" &&
          imgBgRemovedSrcResult !== ""
        ) {
          console.log("dispatch yetiizeFinish");

          photoboothStateDispatch({
            type: "yetiizeFinish",
            payload: { imgBgRemovedSrc: imgBgRemovedSrcResult, index },
          });
        }
      }
    }
    console.groupEnd();
  }, [
    state,
    status,
    isBgRemovedImgEmpty,
    imgBgRemovedSrcResult,
    formResultIndex,
  ]);

  const onClickYetiize = useCallback(async () => {
    if (status === "yetiizeReady") {
      if (doesBgRemovedMatchSrc) {
        photoboothStateDispatch({ type: "shuffleYetiBgIndex", payload: index });
      } else {
        // if (isBgRemovedImgEmpty) {
        //   photoboothStateDispatch({ type: "yetiizeStart" });

        //   const id = setTimeout(async () => {
        //     await proccessImageBg({
        //       src,
        //       index,
        //       photoboothStateDispatch,
        //     });
        //   }, 1000);

        //   setTimerIds((prev) => {
        //     return [...prev, id];
        //   });
        // } else {
        photoboothStateDispatch({ type: "setBgRemovedImg", payload: index });
        // }
      }
    }
  }, [
    doesBgRemovedMatchSrc,
    isBgRemovedImgEmpty,
    index,
    photoboothStateDispatch,
    status,
  ]);

  const onClickUnYetiize = useCallback(async () => {
    if (
      status === "yetiizeReady" &&
      doesBgRemovedMatchSrc &&
      !isBgRemovedImgEmpty
    ) {
      photoboothStateDispatch({ type: "setOriginalImg", payload: index });
    }
  }, [doesBgRemovedMatchSrc, isBgRemovedImgEmpty, index, status]);

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
          src={imgSrc}
        />
      </div>

      {bgRemovedImgSrc !== "" && (
        <button
          disabled={status !== "yetiizeReady"}
          onClick={onClickYetiize}
          className="disabled:cursor-not-allowed disabled:hover:bg-gray-200 disabled:text-gray-400 disabled:border-gray-400 disabled:bg-gray-300 inline-flex items-center text-5xl py-4 px-6 border-4 text-dkblue border-dkblue hover:bg-ltblue rounded-3xl mountains-of-christmas-bold"
        >
          <img
            src={icons[index]}
            alt="yeti icon"
            className="fill-current w-14 h-14 mr-2"
          />
          <span>Yeti-ize!</span>
        </button>
      )}
      {isBgRemovedImgEmpty && (
        <fetcher.Form
          id={`yetiize-form-${index}`}
          key={`yetiize-form-${index}`}
          method="post"
        >
          <input defaultValue={origImg} name="imgSrc" type="hidden" />
          <input defaultValue={index} name="index" type="hidden" />

          <button
            disabled={status !== "yetiizeReady"}
            className="disabled:cursor-not-allowed disabled:hover:bg-gray-200 disabled:text-gray-400 disabled:border-gray-400 disabled:bg-gray-300 inline-flex items-center text-5xl py-4 px-6 border-4 text-dkblue border-dkblue hover:bg-ltblue rounded-3xl mountains-of-christmas-bold"
            name="intent"
            value="yetiize"
          >
            <img
              src={icons[index]}
              alt="yeti icon"
              className="fill-current w-14 h-14 mr-2"
            />
            <span>Yeti-ize!</span>
          </button>
        </fetcher.Form>
      )}
      {doesBgRemovedMatchSrc && (
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
