import {
  redirect,
  type ActionFunctionArgs,
  type MetaFunction,
  type LoaderFunctionArgs,
  json,
} from "@remix-run/node";
// @ts-ignore
// import ipp from "@sealsystems/ipp";
import axios from "axios";
import { MOCK_PRINT } from "~/constants";

import { processImage } from "~/features/yetiize/helpers/imglyProcessNode.server";

import PhotoboothContainer from "~/features/photobooth-state/components/PhotoboothContainer";
import { Params } from "@remix-run/react";
import { z } from "zod";
export const meta: MetaFunction = () => {
  return [
    { title: "Photobooth" },
    { name: "description", content: "Cool photobooth!" },
  ];
};

import print, {
  getJobs,
  queryPrinter,
} from "~/features/print/helpers/print.server";

const intentSchema = z.union([z.literal("yetiize"), z.literal("print")]);

const printActionFormSchema = z.object({
  imageBase64Url: z.string(),
  intent: intentSchema,
});

const printAction = async ({
  params,
  request,
  formData,
}: {
  params: Params<string>;
  formData: FormData;
  request: Request;
}) => {
  const formPayload = Object.fromEntries(formData);

  try {
    const printData = printActionFormSchema.parse(formPayload);
    const { imageBase64Url } = printData;
    console.log({ updates: printData?.imageBase64Url?.length });
    console.log({ formData, formPayload });
    //@ts-ignore
    const res: Response = await fetch(imageBase64Url);
    const blob: Blob = await res.blob();
    const processedFile = new File([blob], `final-blasted.png`, {
      type: "image/jpeg",
    });
    const dataArrayBuffer = await processedFile.arrayBuffer();
    const data = Buffer.from(dataArrayBuffer);

    // const a = Buffer.from(data);
    const url = "http://10.0.0.145:631/";
    console.log({ url });
    // const printer = new ipp.Printer(url);
    // const msg = {
    //   "operation-attributes-tag": {
    //     "document-format": "image/jpeg",
    //   },
    //   data: ,
    // };

    // printer.execute("Print-Job", msg, function (err: any, res: any) {
    //   console.log({ res });
    //   console.log({ err });
    // });
    if (!MOCK_PRINT) {
      const response = await print({ url, data });
      console.log({ response });
    }

    await queryPrinter({ url });

    await getJobs({ url });
    await new Promise((resolve) => {
      setTimeout(() => resolve(""), 10000);
    });
    return redirect(`/`);

    // return { first: "foo" };
  } catch (error) {
    console.error(`form not submitted ${error}`);
    return redirect(`/?error=form-not-submitted`);
  }
};

const yetiizeActionFormSchema = z.object({
  imageBase64Url: z.string(),
  index: z.string(),
  intent: intentSchema,
});

const yetiizeAction = async ({
  params,
  request,
  formData,
}: {
  params: Params<string>;
  formData: FormData;
  request: Request;
}) => {
  console.log({ params });
  const formPayload = Object.fromEntries(formData);

  try {
    const yetiizeData = yetiizeActionFormSchema.parse(formPayload);

    const { imageBase64Url, index } = yetiizeData;

    const bg = await processImage({
      imageBase64Url: imageBase64Url,
      name: `${index}`,
    });
    if (bg === null) {
      console.log("returning error");
      return { imageBase64Url: "error", index };
    }

    const arrayBuf = await bg.arrayBuffer();
    const b64 = Buffer.from(arrayBuf).toString("base64");

    console.log("returning");
    return { imageBase64Url: `data:image/png;base64,${b64}`, index };
  } catch (error) {
    console.error(`form not submitted ${error}`);
    return redirect(`/?error=form-not-submitted`);
  }
};

export const action = async ({ params, request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const intent = formData.get("intent");
  if (intent === "yetiize") {
    return yetiizeAction({ params, request, formData });
  } else if (intent === "print") {
    return printAction({ params, request, formData });
  }
};

// export const loader = async ({ params }: LoaderFunctionArgs) => {
//   // const contact = await getContact(params.contactId);
//   // if (!contact) {
//   //   throw new Response("Not Found", { status: 404 });
//   // }
//   return json({ first: "bar" });
// };

export default function Index() {
  return (
    <>
      <PhotoboothContainer />
    </>
  );
}
