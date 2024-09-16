import { usePhotoboothStatus } from "~/features/photobooth-state/components/PhotoboothStateProvider";
import yetiThinking from "~/images/yeti-thinking-1-big.png";

export default function YetiizeLoading() {
  const status = usePhotoboothStatus();

  if (status !== "yetiizeStart") {
    return <></>;
  }

  return (
    <>
      <div className="items-center justify-items-center justify-center col-start-1 row-start-1 row-span-3 col-span-3 z-10 bg-white">
        <img
          className="object-scale-down rounded-3xl w-full h-full"
          src={yetiThinking}
          alt="yeti thinking"
        />
      </div>
      <div className="justify-center items-center grid z-20 mountains-of-christmas-bold col-start-1 row-start-1 col-span-3 text-9xl drop-shadow-[0_5px_13px_rgba(0,0,0,1)] text-outline text-white">
        <span>Shhh...</span>
      </div>
      <div className="justify-center items-center grid z-20 mountains-of-christmas-bold col-start-1 row-start-3 col-span-3 text-9xl drop-shadow-[0_13px_13px_rgba(0,0,0,1)] text-outline text-white">
        <span>Yetis are thinking</span>
      </div>
    </>
  );
}
