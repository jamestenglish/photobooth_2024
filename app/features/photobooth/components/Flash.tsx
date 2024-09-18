import { usePhotoboothStatus } from "~/features/photobooth-state/components/PhotoboothStateProvider";

export default function Flash() {
  const status = usePhotoboothStatus();
  if (status === "capture" || status === "captureFlash") {
    return (
      <div
        style={{ border: "1px solid magenta" }}
        className="z-10 col-span-3 col-start-1 row-span-3 row-start-1 h-screen w-screen bg-white"
      >
        {" "}
      </div>
    );
  }
  return <></>;
}
