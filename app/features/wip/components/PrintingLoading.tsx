import yetiPainting from "~/images/yeti-painting-1-big.png";

export default function PrintingLoading() {
  return (
    <>
      <div className="items-center justify-items-center justify-center col-start-1 row-start-1 row-span-3 col-span-3 z-10 bg-white">
        <img
          className="object-scale-down rounded-3xl w-full h-full"
          src={yetiPainting}
          alt="yeti thinking"
        />
      </div>
      <div className="justify-center items-center grid z-20 mountains-of-christmas-bold col-start-1 row-start-1 col-span-3 text-9xl drop-shadow-[0_5px_13px_rgba(0,0,0,1)] text-outline text-white">
        <span>Patience</span>
      </div>
      <div className="justify-center items-center grid z-20 mountains-of-christmas-bold col-start-1 row-start-3 col-span-3 text-9xl drop-shadow-[0_13px_13px_rgba(0,0,0,1)] text-outline text-white">
        <span>Yetis are working</span>
      </div>
    </>
  );
}
