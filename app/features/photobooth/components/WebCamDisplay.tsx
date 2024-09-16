import { useRef, useState, useCallback, useEffect } from "react";
import Webcam from "react-webcam";
import { StatusType } from "~/features/photobooth-state/hooks/usePhotoboothState";
import { WEBCAM_HEIGHT, WEBCAM_WIDTH } from "~/constants";
import icon4 from "~/images/yeti-camera-icon-4-removebg-preview.png";
import { usePhotoboothStateMethods } from "~/features/photobooth-state/components/PhotoboothStateProvider";

export default function WebCamDisplay({
  onCapture,
  status,
}: {
  onCapture: (imgSrc: string) => void;
  status: StatusType;
}) {
  const webcamRef = useRef<Webcam>(null);
  const { photoboothStateDispatch } = usePhotoboothStateMethods();

  useEffect(() => {
    if (status === "capture") {
      if (webcamRef.current !== null) {
        const screenshot = webcamRef.current.getScreenshot();

        if (screenshot !== null) {
          onCapture(screenshot);
        }
      }
    }
  });

  const capture = useCallback(() => {
    photoboothStateDispatch({ type: "nextStatus" });
  }, []);

  return (
    <>
      <div className="border-dkblue border-4 min-h-[571px]">
        <Webcam
          height={WEBCAM_HEIGHT}
          width={WEBCAM_WIDTH}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          screenshotQuality={1}
          mirrored={true}
        />
      </div>

      {status === "ready" && (
        <button
          className="inline-flex items-center my-12 text-6xl bg-transparent  text-dkblue py-4 px-6 border-4 border-dkblue hover:bg-ltblue rounded-3xl mountains-of-christmas-bold"
          onClick={capture}
        >
          <img
            src={icon4}
            alt="yeti icon"
            className="fill-current w-14 h-14 mr-2"
          />
          <span>Take Pictures</span>
          <img
            src={icon4}
            alt="yeti icon"
            className="fill-current w-14 h-14 ml-2"
          />
        </button>
      )}
    </>
  );
}
