import { YETIIZE_STATUSES } from "~/constants";
import { usePhotoboothStatus } from "~/features/photobooth-state/components/PhotoboothStateProvider";
import YetiizeCaptures from "./YetiizeCaptures";

export default function PhotoboothControls() {
  const status = usePhotoboothStatus();

  return (
    <>
      <div
        className="col-span-3 col-start-1 row-span-2 row-start-1 items-center align-middle"
        // style={{ border: "1px green" }}
      >
        <div
          className={`mx-auto flex flex-1 flex-row content-start items-start justify-center gap-x-2`}
        >
          <YetiizeCaptures />
        </div>
      </div>
    </>
  );
}
