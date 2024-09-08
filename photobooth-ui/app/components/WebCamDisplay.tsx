import { useRef, useState, useCallback, useEffect } from "react";
import Webcam from "react-webcam";
import { StatusType } from "./WebCamContainer";

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
  // const [imgSrc, setImgSrc] = useState<string | null>(null);

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
    onButtonPress();
  }, []);

  return (
    <>
      <button onClick={capture}>Capture photo</button>

      <Webcam
        height={600}
        width={600}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        screenshotQuality={1}
        mirrored={true}
      />

      {/* {imgSrc !== null && <img src={imgSrc} alt="capture" />} */}
    </>
  );
}
