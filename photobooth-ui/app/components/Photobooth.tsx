import {
  useTransition,
  useSpring,
  useChain,
  config,
  animated,
  useSpringRef,
  easings,
} from "@react-spring/web";

import { useEffect, useRef } from "react";
import Countdowner from "./Countdowner";
import Flash from "./Flash";
import CapturePreview from "./CapturePreview";
import PhotoboothControls from "./PhotoboothControls";
import usePhotoboothState from "~/hooks/usePhotoboothState";
import {
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  MAX_HEIGHT_START_RM,
  MAX_HEIGHT_TARGET_RM,
  COLUMN_GAP_START_RM,
  COLUMN_GAP_TARGET_RM,
  ANIMATION_DURATION_MS,
} from "constants/sizes";

export default function Photobooth() {
  const { status, imgs, transitionState, captureImg } = usePhotoboothState();

  const containerRef = useRef<HTMLDivElement>(null);

  const previousCapturesContainerRef = useRef<HTMLDivElement>(null);

  const isPrintStatus = status === "print";

  const [{ scrollY }, api] = useSpring(() => ({
    config: {
      easing: easings.easeInCubic,
      duration: ANIMATION_DURATION_MS,
    },
    from: {
      scrollY: 0,
      maxHeight: MAX_HEIGHT_START_RM,
      columnGap: COLUMN_GAP_START_RM,
    },
    onChange: (result, spring, item) => {
      console.group("Photobooth useSpring onChange");
      containerRef?.current?.scroll(0, result.value.scrollY);
      if (
        previousCapturesContainerRef?.current?.style.columnGap !== undefined
      ) {
        previousCapturesContainerRef.current.style.columnGap = `${result.value.columnGap}rem`;

        const imgs = Array.from(
          previousCapturesContainerRef.current.getElementsByClassName(
            "preview-img"
          )
        );
        imgs.forEach((el) => {
          const img = el as HTMLImageElement;
          img.style.maxHeight = `${result.value.maxHeight}rem`;
        });
      }

      console.log({
        scrollY: result.value.scrollY,
        columnGap: previousCapturesContainerRef?.current?.style.columnGap,
      });

      console.groupEnd();
    },
  }));

  useEffect(() => {
    if (status === "animateStart") {
      console.group("Photobooth animateStart useEffect");
      const top =
        previousCapturesContainerRef?.current?.getBoundingClientRect()?.top ??
        0;
      console.log(`-----\n-----\n-----\n-----\n-----\n-----\n-----\n${top}`);
      api.start({
        to: {
          scrollY: top,
          columnGap: COLUMN_GAP_TARGET_RM,
          maxHeight: MAX_HEIGHT_TARGET_RM,
        },
      });
      console.groupEnd();
      transitionState();
    }
  }, [status]);

  const onButtonPress = transitionState;

  const onCapture = (imgSrc: string) => {
    captureImg(imgSrc);
    transitionState();
  };

  const onCountdownFinished = transitionState;

  const lastImg = imgs.length > 0 ? imgs[imgs.length - 1] : undefined;

  const areControlsVisible = status !== "capturePreview";

  console.group("Photobooth");
  console.log(`status: ${status} | areControlsVisible: ${areControlsVisible}`);
  console.groupEnd();

  return (
    <>
      <div
        ref={containerRef}
        style={{
          height: `${SCREEN_HEIGHT}px`,
          width: `${SCREEN_WIDTH}px`,
          maxHeight: `${SCREEN_HEIGHT}px`,
          maxWidth: `${SCREEN_WIDTH}px`,
          border: "2px solid purple",
        }}
        className="overflow-hidden"
      >
        <Flash status={status} />

        <Countdowner
          status={status}
          onCountdownFinished={onCountdownFinished}
        />

        <div
          className="flex flex-col gap-6 h-full items-center"
          style={{ border: "1px green" }}
        >
          <CapturePreview lastImg={lastImg} status={status} />

          <PhotoboothControls
            onButtonPress={onButtonPress}
            onCapture={onCapture}
            status={status}
            imgs={imgs}
            previousCapturesContainerRef={previousCapturesContainerRef}
          />
        </div>
        <div
          style={{
            border: "5px solid orange",
            width: "400px",
            height: "1200px",
          }}
        >
          foo
        </div>
      </div>
    </>
  );
}
