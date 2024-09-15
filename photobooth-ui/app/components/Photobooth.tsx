import Countdowner from "./Countdowner";
import Flash from "./Flash";
import CapturePreview from "./CapturePreview";
import PhotoboothControls from "./PhotoboothControls";
import { SCREEN_WIDTH, SCREEN_HEIGHT } from "~/constants";
import {
  usePhotoboothImages,
  usePhotoboothStateMethods,
  usePhotoboothStatus,
} from "./PhotoboothStateProvider";
import YetiizeLoading from "./YetiizeLoading";
import YetiizeControls from "./YetiizeControls";

export default function Photobooth() {
  const { captureImg, transitionState } = usePhotoboothStateMethods();
  const { imgs } = usePhotoboothImages();

  const status = usePhotoboothStatus();

  const onButtonPress = transitionState;

  const onCapture = (imgSrc: string) => {
    captureImg(imgSrc);
    transitionState();
  };

  const onCountdownFinished = transitionState;

  const lastImg = imgs.length > 0 ? imgs[imgs.length - 1] : undefined;

  return (
    <>
      <div
        style={{
          height: `${SCREEN_HEIGHT}px`,
          width: `${SCREEN_WIDTH}px`,
          maxHeight: `${SCREEN_HEIGHT}px`,
          maxWidth: `${SCREEN_WIDTH}px`,
          border: "2px solid purple",
        }}
        className="overflow-hidden"
      >
        <div
          className="grid grid-cols-3 grid-rows-3"
          style={{
            height: `${SCREEN_HEIGHT}px`,
            width: `${SCREEN_WIDTH}px`,
            maxHeight: `${SCREEN_HEIGHT}px`,
            maxWidth: `${SCREEN_WIDTH}px`,
          }}
        >
          <Flash />

          <Countdowner onCountdownFinished={onCountdownFinished} />

          <YetiizeLoading />
          <CapturePreview lastImg={lastImg} />

          <PhotoboothControls
            onButtonPress={onButtonPress}
            onCapture={onCapture}
          />

          <YetiizeControls />
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
      <div>
        <div className="whitespace-pre">status: {status}</div>
      </div>
    </>
  );
}
