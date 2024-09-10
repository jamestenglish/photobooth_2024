import { StatusType } from "~/hooks/usePhotoboothState";

export default function Flash({ status }: { status: StatusType }) {
  if (status === "capture" || status === "captureFlash") {
    return (
      <div style={{ backgroundColor: "white" }} className="w-screen h-screen">
        {" "}
      </div>
    );
  }
  return <></>;
}
