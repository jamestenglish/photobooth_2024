import Photobooth from "~/features/photobooth/components/Photobooth";
import PhotoboothStateProvider from "./PhotoboothStateProvider";
import useAnimation from "~/features/photobooth-state/hooks/useAnimation";

export default function PhotoboothContainer() {
  const {
    previousCapturesContainerRef,
    containerRef,
    webcamDisplayRef,
    startAnimation,
    animationStatus,
  } = useAnimation();
  return (
    <PhotoboothStateProvider
      startAnimation={startAnimation}
      animationStatus={animationStatus}
      previousCapturesContainerRef={previousCapturesContainerRef}
      containerRef={containerRef}
      webcamDisplayRef={webcamDisplayRef}
    >
      <Photobooth />
    </PhotoboothStateProvider>
  );
}
