import {
  redirect,
  type ActionFunctionArgs,
  type MetaFunction,
} from "@remix-run/node";
// @ts-ignore
import ipp from "@sealsystems/ipp";
import axios from "axios";

import PhotoboothContainer from "~/features/photobooth-state/components/PhotoboothContainer";

export const meta: MetaFunction = () => {
  return [
    { title: "Photobooth" },
    { name: "description", content: "Cool photobooth!" },
  ];
};

export const action = async ({ params, request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  // @ts-ignore
  console.log({ updates: updates?.first?.length });

  //@ts-ignore
  const res: Response = await fetch(updates.first);
  const blob: Blob = await res.blob();
  const processedFile = new File([blob], `bg-blasted.png`, {
    type: "image/jpeg",
  });
  const data = await processedFile.arrayBuffer();

  const url = "http://10.0.0.145:631/";
  console.log({ url });
  const printer = new ipp.Printer(url);
  const msg = {
    "operation-attributes-tag": {
      "document-format": "image/jpeg",
    },
    data: Buffer.from(data),
  };

  printer.execute("Print-Job", msg, function (err: any, res: any) {
    console.log({ res });
    console.log({ err });
  });
  const dataA = ipp.serialize({
    operation: "Get-Printer-Attributes",
    "operation-attributes-tag": {
      "attributes-charset": "utf-8",
      "attributes-natural-language": "en",
      "printer-uri": url,
    },
  });

  ipp.request(url, dataA, function (err: any, res: any) {
    if (err) {
      return console.log(err);
    }
    console.log(JSON.stringify(res, null, 2));
  });
  // console.log("axios");
  // axios
  //   .post(url, printer.encodeMsg("Print-Job", msg), {
  //     responseType: "arraybuffer",
  //     headers: printer.getHeaders(),
  //   })
  //   .then((response: any) => {
  //     console.log(printer.decodeMsg(response.data));
  //   })
  //   .catch((err) => {
  //     console.error(err);
  //     console.trace(err);
  //   });
  // await updateContact(params.contactId, updates);
  await new Promise((resolve) => {
    setTimeout(() => resolve(""), 40000);
  });
  return redirect(`/`);
};

export default function Index() {
  return (
    <>
      <PhotoboothContainer />
    </>
  );
}
