import {
  redirect,
  type ActionFunctionArgs,
  type MetaFunction,
} from "@remix-run/node";

import { processImage } from "~/features/yetiize/helpers/imglyProcessNode.server";

import PhotoboothContainer from "~/features/photobooth-state/components/PhotoboothContainer";
import { Params } from "@remix-run/react";
import { z } from "zod";

import saveImgAction from "./helpers/saveImgAction.server";
import { intentSchema } from "./helpers/schema";

export const meta: MetaFunction = () => {
  return [
    { title: "Photobooth" },
    { name: "description", content: "Cool photobooth!" },
  ];
};

import Photobooth from "~/features/photobooth/components/Photobooth";

import printAction from "./helpers/printAction.server";
import saveImg from "./helpers/saveImg";

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

    const imgBgRemovedSrcResult = `data:image/png;base64,${b64ImgSrc}`;
    saveImg({ imgSrc: imgBgRemovedSrcResult, type: "bgrm" });

    return {
      imgBgRemovedSrcResult,
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
  console.log({ intent });
  if (intent === "yetiize") {
    return yetiizeAction({ params, formData });
  } else if (intent === "print") {
    return printAction({ formData });
  } else if (intent === "saveImg") {
    return saveImgAction({ formData });
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
