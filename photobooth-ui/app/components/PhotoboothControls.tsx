import WebCamDisplay from "./WebCamDisplay";

import PreviousCaptures from "./PreviousCaptures";
import { SCREEN_WIDTH, SCREEN_HEIGHT, YETIIZE_STATUSES } from "~/constants";
import {
  useAnimationRefs,
  usePhotoboothStatus,
} from "./PhotoboothStateProvider";

export default function PhotoboothControls({
  onButtonPress,
  onCapture,
}: {
  onButtonPress: () => void;
  onCapture: (imgSrc: string) => void;
}) {
  const status = usePhotoboothStatus();
  const { webcamDisplayRef, previousCapturesContainerRef, containerRef } =
    useAnimationRefs();

  const areControlsVisible = status !== "capturePreview";

  const areControlsPresent = !YETIIZE_STATUSES.includes(status);

  return (
    <>
      {" "}
      {areControlsPresent && (
        <div
          className="col-start-1 col-span-3 row-start-1 row-span-3 items-center align-middle"
          style={{ border: "1px green" }}
        >
          <div
            ref={containerRef}
            className="flex flex-col gap-6 h-full overflow-hidden"
          >
            <div
              ref={webcamDisplayRef}
              className={`${areControlsVisible ? "" : "hidden"} flex items-center flex-col mx-auto gap-y-2`}
            >
              <WebCamDisplay
                onButtonPress={onButtonPress}
                onCapture={onCapture}
                status={status}
              />
            </div>

            <div
              ref={previousCapturesContainerRef}
              className={`${areControlsVisible ? "" : "hidden"} flex justify-center items-start content-start flex-row mx-auto gap-x-2 flex-1`}
            >
              <PreviousCaptures />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
