import WebCamDisplay from "./WebCamDisplay";

import PreviousCaptures from "./PreviousCaptures";
import { StatusType } from "~/hooks/usePhotoboothState";

export default function PhotoboothControls({
  onButtonPress,
  onCapture,
  status,
  imgs,
  previousCapturesContainerRef,
}: {
  onButtonPress: () => void;
  onCapture: (imgSrc: string) => void;
  status: StatusType;
  imgs: Array<string>;
  previousCapturesContainerRef: React.RefObject<HTMLDivElement>;
}) {
  const areControlsVisible = status !== "capturePreview";
  // const classNames =
  //   status === "print"
  //     ? "transition transition-[height] transform ease-in delay-1000 duration-1000 aria-checked:scale-y-0"
  //     : "";

  return (
    <>
      <div
        className={`${areControlsVisible ? "" : "hidden"} flex items-center flex-col mx-auto gap-y-2 grow`}
      >
        <WebCamDisplay
          onButtonPress={onButtonPress}
          onCapture={onCapture}
          status={status}
        />
      </div>

      <div
        ref={previousCapturesContainerRef}
        className={`${areControlsVisible ? "" : "hidden"} flex justify-center items-center flex-row mx-auto gap-x-2 flex-1`}
      >
        <PreviousCaptures imgs={imgs} />
      </div>
    </>
  );
}
