import {
  json,
  redirect,
  type ActionFunctionArgs,
  type MetaFunction,
} from "@remix-run/node";
import { Form, useFetcher, useLoaderData } from "@remix-run/react";
import { useRef } from "react";
import { useInterval, useTimeout } from "usehooks-ts";

import { MOCK_PRINT, PRINTER_URL, PRINTER_POLL_RATE } from "~/constants";
import PhotoboothContainer from "~/features/photobooth-state/components/PhotoboothContainer";
import { getJobAttributes } from "~/features/print/helpers/print.server";
import PrintingLoading from "~/features/wip/components/PrintingLoading";

export const meta: MetaFunction = () => {
  return [
    { title: "Photobooth" },
    { name: "description", content: "Cool photobooth!" },
  ];
};

type ParamsType = {
  jobId: number;
};

export const loader = async ({ params }: { params: ParamsType }) => {
  return json({ jobId: params.jobId, count: 0 });
};

export const action = async ({ params, request }: ActionFunctionArgs) => {
  try {
    const actionUrl = new URL(request.url);
    const count = parseInt(actionUrl.searchParams.get("count") ?? "0");
    console.log({ count });
    if (count > 3) {
      return redirect("/error?error=print-timed-out");
    }
    console.log("action");
    const formData = await request.formData();
    const jobId = parseInt(params.jobId ?? "");
    const url = PRINTER_URL;
    // const jobAttributes = await getJobAttributes({ url, jobId });

    // // console.log("\njobAttributes: ");
    // // console.log({ jobAttributes });
    // if (jobAttributes?.["job-attributes-tag"]?.["job-state"] === "completed") {
    //   return redirect("/");
    // }
    return redirect(`/printing/${jobId}?count=${count + 1}`);
  } catch (error) {
    console.error(error);
    console.error(`print form not submitted ${error}`);
    return redirect(`/error/?error=form-not-submitted`);
  }
};

export default function Printing() {
  const { jobId } = useLoaderData<typeof loader>();

  const buttonRef =
    useRef<HTMLButtonElement>() as React.MutableRefObject<HTMLButtonElement>;

  useInterval(() => {
    console.log("click");
    buttonRef?.current?.click();
  }, PRINTER_POLL_RATE);

  const fetcher = useFetcher<typeof action>();
  const { state, data } = fetcher;

  return (
    <>
      <PhotoboothContainer>
        <div className="grid h-full w-full grid-cols-9 grid-rows-9 bg-snow">
          <PrintingLoading />
        </div>

        <div>{jobId}</div>
      </PhotoboothContainer>
      <fetcher.Form id="printer-form" method="post">
        <button
          ref={buttonRef}
          className="mountains-of-christmas-bold hidden items-center rounded-3xl border-4 border-dkblue bg-pastel px-6 py-4 text-8xl text-ltblue hover:bg-ltblue hover:text-dkblue disabled:cursor-not-allowed disabled:border-gray-400 disabled:bg-gray-300 disabled:text-gray-400 disabled:hover:bg-gray-200"
          type="submit"
          name="intent"
          value="print"
        >
          <span>Print!</span>
        </button>
      </fetcher.Form>
    </>
  );
}
