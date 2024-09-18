import clsx from "clsx";
import PreviousCaptureContainer from "./PreviousCaptureContainer";
import {
  useAnimationRefs,
  usePhotoboothImages,
  usePhotoboothStatus,
} from "~/features/photobooth-state/components/PhotoboothStateProvider";
import { YETIIZE_STATUSES } from "~/constants";

export default function PreviousCaptures() {
  const { images } = usePhotoboothImages();

  const { previousCapturesContainerRef } = useAnimationRefs();
  const status = usePhotoboothStatus();
  const areControlsPresent =
    !YETIIZE_STATUSES.includes(status) &&
    status !== "capturePreview" &&
    images.length > 0;

  const imgTags = images.map((src, index) => {
    // normally index's are bad keys but this won't be reordered
    return <PreviousCaptureContainer key={index} src={src} />;
  });

  return (
    <>
      {areControlsPresent ? (
        <div
          ref={previousCapturesContainerRef}
          className="mx-auto flex flex-1 flex-row content-start items-start justify-center gap-x-2"
        >
          {imgTags}
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
