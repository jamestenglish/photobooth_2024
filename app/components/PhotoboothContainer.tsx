import Photobooth from "./Photobooth";
import PhotoboothStateProvider from "./PhotoboothStateProvider";
import useAnimation from "~/hooks/useAnimation";

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
