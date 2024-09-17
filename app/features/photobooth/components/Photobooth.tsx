import Countdowner from "./Countdowner";
import Flash from "./Flash";
import CapturePreview from "./CapturePreview";
import PhotoboothControls from "./PhotoboothControls";
import { SCREEN_WIDTH, SCREEN_HEIGHT, YETIIZE_STATUSES } from "~/constants";
import {
  usePhotoboothImages,
  usePhotoboothStateMethods,
  usePhotoboothStatus,
} from "~/features/photobooth-state/components/PhotoboothStateProvider";
import YetiizeLoading from "~/features/yetiize/components/YetiizeLoading";
import YetiizeControls from "~/features/yetiize/components/YetiizeControls";
import CanvasTest from "~/features/wip/components/CanvestTest";
import { useState } from "react";
import PrintForm from "~/features/wip/components/PrintForm";

export default function Photobooth() {
  const { photoboothStateDispatch } = usePhotoboothStateMethods();
  const { imgs } = usePhotoboothImages();
  const [file, setFile] = useState<string>("");

  const status = usePhotoboothStatus();

  const onCapture = (imgSrc: string) => {
    photoboothStateDispatch({ type: "captureImg", payload: imgSrc });
    photoboothStateDispatch({ type: "nextStatus" });
  };

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
        className="overflow-hidden bg-snow"
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

          <Countdowner />

          <YetiizeLoading />
          <CapturePreview lastImg={lastImg} />

          <PhotoboothControls onCapture={onCapture} />

          <YetiizeControls />

          {YETIIZE_STATUSES.includes(status) && <PrintForm file={file} />}
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
      {YETIIZE_STATUSES.includes(status) && <CanvasTest setFile={setFile} />}
      <div className="flex">
        <div>
          Canvas:<canvas style={{ border: "1px solid green" }} id="c"></canvas>
        </div>
      </div>
    </>
  );
}
