import { Form } from "@remix-run/react";
import icon1 from "~/images/yeti-paint-icons-1.png";
import icon2 from "~/images/yeti-paint-icons-2.png";

export default function PrintForm({ file }: { file: string }) {
  return (
    <>
      <div className="col-span-3 col-start-1 row-start-3 mt-12 grid items-center justify-center">
        <Form id="printer-form" method="post">
          <input defaultValue={file} name="imgSrc" type="hidden" />
          <button
            className="mountains-of-christmas-bold my-12 inline-flex items-center rounded-3xl border-4 border-dkblue bg-pastel px-6 py-4 text-8xl text-ltblue hover:bg-ltblue hover:text-dkblue"
            type="submit"
            name="intent"
            value="print"
          >
            <img
              src={icon1}
              alt="yeti icon"
              className="mr-2 h-24 w-24 fill-current"
            />
            <span>Print!</span>
            <img
              src={icon2}
              alt="yeti icon"
              className="ml-2 h-24 w-24 fill-current"
            />
          </button>
        </Form>
      </div>
    </>
  );
}
