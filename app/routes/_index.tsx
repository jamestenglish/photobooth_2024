import {
  redirect,
  type ActionFunctionArgs,
  type MetaFunction,
} from "@remix-run/node";

import { MOCK_PRINT, IS_PRINTER } from "~/constants";

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
import Photobooth from "~/features/photobooth/components/Photobooth";

const intentSchema = z.union([z.literal("yetiize"), z.literal("print")]);

const printActionFormSchema = z.object({
  imgSrc: z.string(),
  intent: intentSchema,
});

const printAction = async ({ formData }: { formData: FormData }) => {
  const formPayload = Object.fromEntries(formData);

  try {
    const printData = printActionFormSchema.parse(formPayload);
    const { imgSrc } = printData;
    console.log({ updates: printData?.imgSrc?.length });
    // console.log({ formData, formPayload });

    const res: Response = await fetch(imgSrc);
    const blob: Blob = await res.blob();
    const processedFile = new File([blob], `final-blasted.png`, {
      type: "image/jpeg",
    });
    const dataArrayBuffer = await processedFile.arrayBuffer();
    const data = Buffer.from(dataArrayBuffer);

    const url = "http://10.0.0.145:631/";
    console.log({ url });

    if (MOCK_PRINT) {
      await new Promise((resolve) => {
        setTimeout(() => resolve(""), 5000);
      });
    } else {
      const response = await print({ url, data });
      console.log({ response });
    }

    if (IS_PRINTER) {
      await queryPrinter({ url });

      const getJobsResult = await getJobs({ url });

      console.log({ getJobsResult });
    }

    return redirect(`/printing/1234`);
  } catch (error) {
    console.error(`print form not submitted ${error}`);
    return redirect(`/?error=form-not-submitted`);
  }
};

const yetiizeActionFormSchema = z.object({
  imgSrc: z.string(),
  index: z.string(),
  intent: intentSchema,
});

const yetiizeAction = async ({
  params,
  formData,
}: {
  params: Params<string>;
  formData: FormData;
}) => {
  console.log({ params });
  const formPayload = Object.fromEntries(formData);

  try {
    const yetiizeData = yetiizeActionFormSchema.parse(formPayload);

    const { imgSrc, index } = yetiizeData;

    const bg = await processImage({
      imgSrc: imgSrc,
      name: `${index}`,
    });
    if (bg === null) {
      console.log("returning error");
      return { imgBgRemovedSrcResult: "error", index };
    }

    const arrayBuf = await bg.arrayBuffer();
    const b64ImgSrc = Buffer.from(arrayBuf).toString("base64");

    console.log("returning");
    return {
      imgBgRemovedSrcResult: `data:image/png;base64,${b64ImgSrc}`,
      index,
    };
  } catch (error) {
    console.error(`yetiize form not submitted ${error}`);
    return redirect(`/?error=form-not-submitted`);
  }
};

export const action = async ({ params, request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const intent = formData.get("intent");
  if (intent === "yetiize") {
    return yetiizeAction({ params, formData });
  } else if (intent === "print") {
    return printAction({ formData });
  }
};

export default function Index() {
  return (
    <>
      <PhotoboothContainer>
        <Photobooth />
      </PhotoboothContainer>
    </>
  );
}
