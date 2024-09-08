import { StatusType } from "./WebCamContainer";

export default function Flash({ status }: { status: StatusType }) {
  if (status === "capture" || status === "captureFlash") {
    return (
      <div
        style={{ height: "100px", width: "100px", backgroundColor: "black" }}
      >
        {" "}
        foo
      </div>
    );
  }
  return <></>;
}
