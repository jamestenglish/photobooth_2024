import yetiPainting from "~/images/yeti-painting-1-big.png";

export default function PrintingLoading() {
  return (
    <>
      <div className="z-10 col-span-3 col-start-1 row-span-3 row-start-1 items-center justify-center justify-items-center bg-white">
        <img
          className="h-full w-full rounded-3xl object-scale-down"
          src={yetiPainting}
          alt="yeti thinking"
        />
      </div>
      <div className="mountains-of-christmas-bold text-outline z-20 col-span-3 col-start-1 row-start-1 grid items-center justify-center text-9xl text-white drop-shadow-[0_5px_13px_rgba(0,0,0,1)]">
        <span>Patience</span>
      </div>
      <div className="mountains-of-christmas-bold text-outline z-20 col-span-3 col-start-1 row-start-3 grid items-center justify-center text-9xl text-white drop-shadow-[0_13px_13px_rgba(0,0,0,1)]">
        <span>Yetis are working</span>
      </div>
    </>
  );
}
