import icon1 from "~/images/yeti-paint-icons-1.png";
import icon2 from "~/images/yeti-paint-icons-2.png";

export default function Cancel() {
  return (
    <>
      <div className="justify-left col-span-1 col-start-1 row-start-3 mt-12 grid items-center">
        <div>
          <button className="mountains-of-christmas-bold bg-error my-12 flex items-center rounded-3xl border-4 border-ltblue px-6 py-4 text-4xl text-dkblue hover:bg-ltblue">
            <img
              src={icon1}
              alt="yeti icon"
              className="mr-2 h-12 w-12 fill-current"
            />
            <span>cancel</span>
            <img
              src={icon2}
              alt="yeti icon"
              className="ml-2 h-12 w-12 fill-current"
            />
          </button>
        </div>
      </div>
    </>
  );
}
