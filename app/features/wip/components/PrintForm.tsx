import { Form } from "@remix-run/react";
import icon1 from "~/images/yeti-paint-icons-1.png";
import icon2 from "~/images/yeti-paint-icons-2.png";

export default function PrintForm({ file }: { file: string }) {
  return (
    <>
      <div className="mt-12 flex justify-center items-center grid row-start-3 col-start-1 col-span-3 ">
        <Form id="printer-form" method="post">
          <input defaultValue={file} name="imgSrc" type="hidden" />
          <button
            className="inline-flex items-center my-12 text-8xl bg-pastel  text-dkblue py-4 px-6 border-4 border-dkblue hover:bg-ltblue rounded-3xl mountains-of-christmas-bold"
            type="submit"
            name="intent"
            value="print"
          >
            <img
              src={icon1}
              alt="yeti icon"
              className="fill-current w-24 h-24 mr-2"
            />
            <span>Print!</span>
            <img
              src={icon2}
              alt="yeti icon"
              className="fill-current w-24 h-24 ml-2"
            />
          </button>
        </Form>
      </div>
    </>
  );
}
