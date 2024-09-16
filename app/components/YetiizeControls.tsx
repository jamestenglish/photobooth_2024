import { YETIIZE_STATUSES } from "~/constants";
import { usePhotoboothStatus } from "./PhotoboothStateProvider";
import YetiizeCaptures from "./YetiizeCaptures";

export default function PhotoboothControls() {
  const status = usePhotoboothStatus();

  const areControlsPresent = YETIIZE_STATUSES.includes(status);

  return (
    <>
      {areControlsPresent && (
        <div
          className="col-start-1 col-span-3 row-start-1 row-span-3 items-center align-middle"
          style={{ border: "1px green" }}
        >
          <div
            className={`flex justify-center items-start content-start flex-row mx-auto gap-x-2 flex-1`}
          >
            <YetiizeCaptures />
          </div>
        </div>
      )}
    </>
  );
}
