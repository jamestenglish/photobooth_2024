import Countdowner from "./Countdowner";
import Flash from "./Flash";
import CapturePreview from "./CapturePreview";
import PhotoboothControls from "./PhotoboothControls";
import { YETIIZE_STATUSES } from "~/constants";
import {
  useAnimationRefs,
  usePhotoboothImages,
  usePhotoboothStateMethods,
  usePhotoboothStatus,
} from "~/features/photobooth-state/components/PhotoboothStateProvider";
import YetiizeLoading from "~/features/yetiize/components/YetiizeLoading";
import YetiizeControls from "~/features/yetiize/components/YetiizeControls";
import PrintForm from "~/features/wip/components/PrintForm";
import PreviousCaptures from "./PreviousCaptures";
import Cancel from "~/features/wip/components/Cancel";

export default function Photobooth() {
  const { photoboothStateDispatch } = usePhotoboothStateMethods();
  const { images, finalImg } = usePhotoboothImages();

  const status = usePhotoboothStatus();
  const { containerRef } = useAnimationRefs();

  const onCapture = (imgSrc: string) => {
    photoboothStateDispatch({ type: "captureImg", payload: imgSrc });
    photoboothStateDispatch({ type: "nextStatus" });
  };

  const lastImg = images.length > 0 ? images[images.length - 1] : undefined;

  const areControlsPresent = !YETIIZE_STATUSES.includes(status);

  return (
    <>
      <div className="grid h-full w-full grid-cols-3 grid-rows-3 bg-snow">
        <Flash />

        <Countdowner />

        <YetiizeLoading />
        <CapturePreview lastImg={lastImg} />
        {areControlsPresent ? (
          <div className="col-span-3 col-start-1 row-span-3 row-start-1 items-center align-middle">
            <div
              ref={containerRef}
              className="flex h-full flex-col gap-6 overflow-hidden"
            >
              <PhotoboothControls onCapture={onCapture} />

              <PreviousCaptures />
            </div>
          </div>
        ) : (
          <>
            <YetiizeControls />

            <Cancel />
            <PrintForm file={finalImg} />
          </>
        )}
      </div>
    </>
  );
}
