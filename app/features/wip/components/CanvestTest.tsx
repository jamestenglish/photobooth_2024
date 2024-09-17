import {
  useLayoutEffect,
  useCallback,
  useState,
  useRef,
  useMemo,
  useEffect,
} from "react";

import { YETIS } from "~/constants";
import snipPng from "~/images/snip.png";
import {
  usePhotoboothImages,
  usePhotoboothStatus,
} from "~/features/photobooth-state/components/PhotoboothStateProvider";
import { Form, useFetcher, useLoaderData } from "@remix-run/react";
import drawCanvas, { createImageLoadPromise } from "./drawCanvas";
import toPng from "~/features/yetiize/helpers/toPng.client";
const fonts = [
  {
    "font-family": "Mountains of Christmas",
    "font-style": "normal",
    "font-weight": 700,
    src: "https://fonts.gstatic.com/s/mountainsofchristmas/v22/3y9z6a4zcCnn5X0FDyrKi2ZRUBIy8uxoUo7eBGqJJPxIO7yLeEE.woff2",
  },
];

async function loadFonts(fontsToLoad: any) {
  if (fontsToLoad.length) {
    for (let i = 0; i < fontsToLoad.length; i++) {
      let fontProps = fontsToLoad[i];
      let fontFamily = fontProps["font-family"];
      let fontWeight = fontProps["font-weight"];
      let fontStyle = fontProps["font-style"];
      let fontUrl = Array.isArray(fontProps["src"])
        ? fontProps["src"][0][0]
        : fontProps["src"];
      if (fontUrl.indexOf("url(") === -1) {
        fontUrl = "url(" + fontUrl + ")";
      }
      let fontFormat = fontProps["src"][0][1] ? fontProps["src"][1] : "";
      const font = new FontFace(fontFamily, fontUrl);
      font.weight = fontWeight;
      font.style = fontStyle;
      await font.load();
      document.fonts.add(font);

      // apply font styles to body
      let fontDOMEl = document.createElement("div");
      fontDOMEl.textContent = "";
      document.body.appendChild(fontDOMEl);
      fontDOMEl.setAttribute(
        "style",
        `position:fixed; height:0; width:0; overflow:hidden; font-family:${fontFamily}; font-weight:${fontWeight}; font-style:${fontStyle}`
      );
    }
  }
}

export default function CanvasTest({
  setFile,
}: {
  setFile: React.Dispatch<React.SetStateAction<string>>;
}) {
  const { yetiBgIndicies, imgs } = usePhotoboothImages();
  const status = usePhotoboothStatus();

  const promiseRef = useRef([Promise.resolve()]);

  const onClick = useCallback(async () => {
    try {
      const canvas = document.getElementById("c") as HTMLCanvasElement;

      console.log({ canvas });
      const blob = await new Promise((resolve, reject) =>
        canvas.toBlob((blob) => (blob ? resolve(blob) : reject()), "image/png")
      );
      console.log({ blob });
      setFile(canvas.toDataURL("image/jpeg"));
    } catch (err) {
      console.error(err);
      console.trace(err);
    }
  }, [status, ...yetiBgIndicies, ...imgs]);

  const yetiImgs = useMemo(() => {
    return YETIS.map(() => new Image());
  }, []);

  const [isStaticLoaded, setIsStaticLoaded] = useState(false);
  useLayoutEffect(() => {
    const load = async () => {
      console.group("static loading");
      console.log("loading static promises");
      await loadFonts(fonts);

      const promises = [...yetiImgs].map((img) => {
        createImageLoadPromise(img);
      });

      yetiImgs.forEach((img, index) => {
        img.src = YETIS[index];
      });

      await Promise.all(promises);
      console.log("DONE loading static promises");
      setIsStaticLoaded(true);
      console.groupEnd();
    };

    load();
  }, []);

  useLayoutEffect(() => {
    console.log({ length: imgs.length, status, yetiBgIndicies });
    if (imgs.length === 3 && isStaticLoaded) {
      const promise = drawCanvas({
        promiseRef,
        imgs,
        snipPng,
        yetiImgs,
        yetiBgIndicies,
        setFile,
      });
      promiseRef.current.push(promise);
    }
  }, [...imgs, ...yetiBgIndicies, isStaticLoaded]);

  const fetcher = useFetcher();
  // const fiz = useLoaderData();
  console.log({ fetcher });

  // @ts-ignore
  const outputSrc = fetcher?.data?.first;

  const [tmpImg, setTmpImg] = useState<string | undefined>();

  useEffect(() => {
    const foo = async () => {
      const output = await toPng({ imageBase64Url: imgs[0], name: "foo" });
      setTmpImg(output);
    };
    foo();
  }, [imgs[0]]);
  return (
    <>
      <fetcher.Form
        id="contact-form"
        method="post"
        // encType="multipart/form-data"
      >
        <p>
          <span>Name</span>
          <input
            defaultValue={imgs[0]}
            aria-label="First name"
            name="imageBase64Url"
            type="hidden"
          />
          {/* <input ref={fileRef} type="file" /> */}
        </p>
        <img src={imgs[0]} />
        {outputSrc !== undefined && <img src={outputSrc} />}
        <button className="inline-flex items-center my-12 text-6xl bg-transparent  text-dkblue py-4 px-6 border-4 border-dkblue hover:bg-ltblue rounded-3xl mountains-of-christmas-bold">
          FORM SUBIT
        </button>
      </fetcher.Form>
      <button
        className="inline-flex items-center my-12 text-6xl bg-transparent  text-dkblue py-4 px-6 border-4 border-dkblue hover:bg-ltblue rounded-3xl mountains-of-christmas-bold"
        onClick={onClick}
      >
        test
      </button>
    </>
  );
}

// // @ts-ignore
// const processedFile = new File([blob], `bg-blasted.png`, {
//   type: "image/png",
// });

// const data = await processedFile.arrayBuffer();

// console.log({ data });

// const url = "http://10.0.0.145:631/ipp/printer";
// const printer = new Printer(url);
// const msg = {
//   "operation-attributes-tag": {
//     "document-format": "image/png",
//   },
//   data: Buffer.from(data),
// };

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
// const url = "http://10.0.0.145:631/ipp/printer";
// const printer = new Printer(url);
// const msg = {
//   "operation-attributes-tag": {
//     "document-format": "image/png",
//   },
//   data: Buffer.from(data),
// };

// const url = "http://10.0.0.145:631/ipp/printer";
// const url = "http://10.0.0.145:631/";
// const printer = new Printer(url);
// const msg = {
//   "operation-attributes-tag": {
//     "attributes-charset": "utf-8",
//     "attributes-natural-language": "en",
//     "printer-uri": url,
//   },
// };

// console.log("axios");
// axios
//   .post(url, printer.encodeMsg("Get-Printer-Attributes", msg), {
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
