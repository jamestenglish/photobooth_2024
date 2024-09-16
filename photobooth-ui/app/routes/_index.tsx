import {
  redirect,
  type ActionFunctionArgs,
  type MetaFunction,
} from "@remix-run/node";
// @ts-ignore
import ipp from "@sealsystems/ipp";
import axios from "axios";

import PhotoboothContainer from "~/components/PhotoboothContainer";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
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
      {/* <div className="font-sans p-4">
        <h1 className="text-3xl">Welcome to Remix</h1>
        <ul className="list-disc mt-4 pl-6 space-y-2">
          <li>
            <a
              className="text-blue-700 underline visited:text-purple-900"
              target="_blank"
              href="https://remix.run/start/quickstart"
              rel="noreferrer"
            >
              5m Quick Start
            </a>
          </li>
          <li>
            <a
              className="text-blue-700 underline visited:text-purple-900"
              target="_blank"
              href="https://remix.run/start/tutorial"
              rel="noreferrer"
            >
              30m Tutorial
            </a>
          </li>
          <li>
            <a
              className="text-blue-700 underline visited:text-purple-900"
              target="_blank"
              href="https://remix.run/docs"
              rel="noreferrer"
            >
              Remix Docs
            </a>
          </li>
        </ul>
      </div> */}
    </>
  );
}
