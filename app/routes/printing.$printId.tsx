import {
  json,
  redirect,
  type ActionFunctionArgs,
  type MetaFunction,
} from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { MOCK_PRINT } from "~/constants";
import PhotoboothContainer from "~/features/photobooth-state/components/PhotoboothContainer";
import PrintingLoading from "~/features/wip/components/PrintingLoading";

export const meta: MetaFunction = () => {
  return [
    { title: "Photobooth" },
    { name: "description", content: "Cool photobooth!" },
  ];
};

type ParamsType = {
  printId: number;
};

export const loader = async ({ params }: { params: ParamsType }) => {
  return json({ printId: params.printId });
};

export const action = async ({ params, request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  // const intent = formData.get("intent");
  return redirect(`/`);
};

export default function Printing() {
  const { printId } = useLoaderData<typeof loader>();

  return (
    <>
      <PhotoboothContainer>
        <div className="grid h-full w-full grid-cols-3 grid-rows-3 bg-snow">
          <PrintingLoading />
        </div>

        <div>{printId}</div>
      </PhotoboothContainer>
    </>
  );
}
