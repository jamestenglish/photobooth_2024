import Photobooth from "~/features/photobooth/components/Photobooth";
import PhotoboothStateProvider from "./PhotoboothStateProvider";
import useAnimation from "~/features/photobooth-state/hooks/useAnimation";
import WindowConstraint from "~/features/wip/components/WindowContraint";
import Canvas from "~/features/canvas/components/Canvas";

export default function PhotoboothContainer({
  children,
}: {
  children: React.ReactNode;
}) {
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
      <WindowConstraint>{children}</WindowConstraint>
      <Canvas />
    </PhotoboothStateProvider>
  );
}

// TODO JTE back button on printform
// TODO JTE print status
// TODO JTE full screen button
