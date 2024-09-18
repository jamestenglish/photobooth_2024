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
import PrintForm from "~/features/wip/components/PrintForm";

export default function Photobooth() {
  const { photoboothStateDispatch } = usePhotoboothStateMethods();
  const { images, finalImg } = usePhotoboothImages();

  const status = usePhotoboothStatus();

  const onCapture = (imgSrc: string) => {
    photoboothStateDispatch({ type: "captureImg", payload: imgSrc });
    photoboothStateDispatch({ type: "nextStatus" });
  };

  const lastImg = images.length > 0 ? images[images.length - 1] : undefined;

  return (
    <>
      <div className="grid h-full w-full grid-cols-3 grid-rows-3 bg-snow">
        <Flash />

        <Countdowner />

        <YetiizeLoading />
        <CapturePreview lastImg={lastImg} />

        <PhotoboothControls onCapture={onCapture} />

        <YetiizeControls />

        {YETIIZE_STATUSES.includes(status) && <PrintForm file={finalImg} />}
      </div>
    </>
  );
}
