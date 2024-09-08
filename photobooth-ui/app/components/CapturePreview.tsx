import { StatusType } from "./WebCamContainer";

export default function CapturePreview({
  status,
  lastImg,
}: {
  status: StatusType;
  lastImg: string | undefined;
}) {
  const isCapturePreview = status === "capturePreview";

  if (isCapturePreview && lastImg !== undefined) {
    return <img src={lastImg} />;
  }
  return <></>;
}
