import WebCamDisplay from "./WebCamDisplay";

import PreviousCaptures from "./PreviousCaptures";
import { YETIIZE_STATUSES } from "~/constants";
import {
  useAnimationRefs,
  usePhotoboothStatus,
} from "~/features/photobooth-state/components/PhotoboothStateProvider";

export default function PhotoboothControls({
  onCapture,
}: {
  onCapture: (imgSrc: string) => void;
}) {
  const status = usePhotoboothStatus();

  const { webcamDisplayRef, containerRef } = useAnimationRefs();

  const areControlsVisible = status !== "capturePreview";

  const areControlsPresent = !YETIIZE_STATUSES.includes(status);

  return (
    <>
      {areControlsPresent && (
        // <div
        //   className="col-span-3 col-start-1 row-span-3 row-start-1 items-center align-middle"
        //   style={{ border: "1px green" }}
        // >
        // <div
        //   ref={containerRef}
        //   className="flex h-full flex-col gap-6 overflow-hidden"
        // >
        <div
          ref={webcamDisplayRef}
          className={`${areControlsVisible ? "" : "hidden"} mx-auto flex flex-col items-center gap-y-2`}
        >
          <WebCamDisplay onCapture={onCapture} status={status} />
        </div>
        // </div>
        // </div>
      )}
    </>
  );
}
