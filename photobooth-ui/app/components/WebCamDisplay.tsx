import { useRef, useState, useCallback, useEffect } from "react";
import Webcam from "react-webcam";
import { StatusType } from "~/hooks/usePhotoboothState";
import { WEBCAM_HEIGHT, WEBCAM_WIDTH } from "~/constants";
import icon4 from "~/images/yeti-camera-icon-4-removebg-preview.png";

export default function WebCamDisplay({
  onButtonPress,
  onCapture,
  status,
}: {
  onButtonPress: () => void;
  onCapture: (imgSrc: string) => void;
  status: StatusType;
}) {
  const webcamRef = useRef<Webcam>(null);

  useEffect(() => {
    console.group("WebCamDisplay useEffect");
    if (status === "capture") {
      console.log(`status is capture`);
      if (webcamRef.current !== null) {
        console.log(`  has ref`);

        const screenshot = webcamRef.current.getScreenshot();
        console.log(`    screenshot: ${screenshot}`);

        if (screenshot !== null) {
          console.log("calling callback");
          onCapture(screenshot);
        }
      }
    }
    console.groupEnd();
  });

  const capture = useCallback(() => {
    onButtonPress();
  }, []);

  return (
    <>
      <Webcam
        height={WEBCAM_HEIGHT}
        width={WEBCAM_WIDTH}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        screenshotQuality={1}
        mirrored={true}
      />

      {status === "ready" && (
        <button
          className="inline-flex items-center my-12 text-6xl bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-4 px-6 border-4 border-blue-500 hover:border-transparent rounded-full"
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
