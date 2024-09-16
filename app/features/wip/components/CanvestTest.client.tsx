import {
  useLayoutEffect,
  useCallback,
  useState,
  useRef,
  useMemo,
  useEffect,
} from "react";
import axios from "axios";
import { Buffer } from "buffer";

import { YETIS } from "~/constants";
import templateImg from "~/images/template.png";
import {
  usePhotoboothImages,
  usePhotoboothStatus,
} from "~/features/photobooth-state/components/PhotoboothStateProvider";
import { Form } from "@remix-run/react";

const SETTINGS = {
  WIDTH: 1200,
  HEIGHT: 1800,
  PICTURE_WIDTH: 566,
  PICTURE_HEIGHT: 426,
  INITIAL_X: 18,
  X_OFFSET: 600,
  Y_OFFSETS: [30, 477, 922],
  SECONDARY_COLOR: "#D5E8F2",
  PRIMARY_COLOR: "#004681",
  BG_COLOR: "#F6F5FA",
  FRAME_WIDTH: 4,
  TEXT_OUTLINE_WIDTH: 8,
} as const;

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

const createImageLoadPromise = (img: HTMLImageElement) => {
  return new Promise((resolve) => {
    img.onload = () => {
      resolve(true);
    };
  });
};

export default function CanvasTest() {
  const { yetiBgIndicies, imgs } = usePhotoboothImages();
  const status = usePhotoboothStatus();
  const [file, setFile] = useState<string>("");

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
      const draw = async () => {
        await Promise.all(promiseRef.current);
        promiseRef.current = [Promise.resolve()];
        console.group("draw");
        console.log({ length: promiseRef.current.length });
        console.log({ foo: promiseRef.current[0] });
        console.log("drawing canvas");
        // TODO JTE 1        // const template = new Image(SETTINGS.WIDTH, SETTINGS.HEIGHT);
        const templateImgs = [new Image(), new Image(), new Image()];

        // TODO JTE 1        // const promises = [template, ...templateImgs].map((img) => {
        //   return createImageLoadPromise(img);
        // });
        const promises = [...templateImgs].map((img) => {
          return createImageLoadPromise(img);
        });

        templateImgs.forEach((img, index) => {
          img.src = imgs[index];
        });

        // TODO JTE 1        // template.src = templateImg;

        const canvas = document.getElementById("c") as HTMLCanvasElement;
        canvas.width = SETTINGS.WIDTH;
        canvas.height = SETTINGS.HEIGHT;
        const ctx = canvas.getContext("2d");
        await Promise.all(promises);

        if (ctx !== null) {
          console.log("  ctx not null");
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          ctx.fillStyle = SETTINGS.BG_COLOR;
          ctx.fillRect(0, 0, SETTINGS.WIDTH, SETTINGS.HEIGHT);

          // TODO JTE 1          // ctx.drawImage(template, 0, 0);

          [0, SETTINGS.X_OFFSET].forEach((offset) => {
            SETTINGS.Y_OFFSETS.forEach((y, index) => {
              console.group(`draw loop ${index}`);
              console.log({
                templateImgLength: templateImgs[index].src.length,
              });

              ctx.fillStyle = SETTINGS.PRIMARY_COLOR;
              ctx.fillRect(
                SETTINGS.INITIAL_X - SETTINGS.FRAME_WIDTH / 2,
                y - SETTINGS.FRAME_WIDTH / 2,
                SETTINGS.PICTURE_WIDTH + SETTINGS.FRAME_WIDTH / 2,
                SETTINGS.PICTURE_HEIGHT + SETTINGS.FRAME_WIDTH / 2
              );

              const yetiImage = yetiImgs[yetiBgIndicies[index]];

              ctx.drawImage(
                yetiImage,
                0,
                0,
                yetiImage.width,
                (SETTINGS.PICTURE_HEIGHT / SETTINGS.PICTURE_WIDTH) *
                  yetiImage.height,
                SETTINGS.INITIAL_X + offset,
                y,
                SETTINGS.PICTURE_WIDTH,
                SETTINGS.PICTURE_HEIGHT
              );
              ctx.drawImage(
                templateImgs[index],
                SETTINGS.INITIAL_X + offset,
                y,
                SETTINGS.PICTURE_WIDTH,
                SETTINGS.PICTURE_HEIGHT
              );
              console.groupEnd();
            });
          });
          ctx.font = `normal 700 120px "Mountains of Christmas"`;
          ctx.textAlign = "center";
          ctx.fillStyle = SETTINGS.SECONDARY_COLOR;
          ctx.strokeStyle = SETTINGS.PRIMARY_COLOR;
          ctx.lineWidth = SETTINGS.TEXT_OUTLINE_WIDTH;
          const line1 = import.meta.env.VITE_LINE_1;
          ctx.strokeText(line1, 300, 1480, 598);
          ctx.fillText(line1, 300, 1480, 598);

          ctx.strokeText(line1, 900, 1480, 598);
          ctx.fillText(line1, 900, 1480, 598);

          const line2 = import.meta.env.VITE_LINE_2;
          ctx.strokeText(line2, 300, 1620, 598);
          ctx.fillText(line2, 300, 1620, 598);
          ctx.strokeText(line2, 900, 1620, 598);
          ctx.fillText(line2, 900, 1620, 598);

          const line3 = import.meta.env.VITE_LINE_3;
          ctx.font = `normal 700 70px "Mountains of Christmas", serif`;
          ctx.strokeText(line3, 300, 1750, 598);
          ctx.fillText(line3, 300, 1750, 598);
          ctx.strokeText(line3, 900, 1750, 598);
          ctx.fillText(line3, 900, 1750, 598);

          const line4 = import.meta.env.VITE_LINE_4;
          ctx.font = `normal 700 40px "Mountains of Christmas", serif`;
          ctx.strokeText(line4, 410, 1730, 598);
          ctx.fillText(line4, 410, 1730, 598);
          ctx.strokeText(line4, 1010, 1730, 598);
          ctx.fillText(line4, 1010, 1730, 598);
        }
        console.groupEnd();
      };

      const promise = draw();
      promiseRef.current.push(promise);
    }
  }, [...imgs, ...yetiBgIndicies, isStaticLoaded]);

  return (
    <>
      <Form
        key="1234"
        id="contact-form"
        method="post"
        // encType="multipart/form-data"
      >
        <p>
          <span>Name</span>
          <input
            defaultValue={file}
            aria-label="First name"
            name="first"
            type="hidden"
          />
          {/* <input ref={fileRef} type="file" /> */}
        </p>
        <button
          className="inline-flex items-center my-12 text-6xl bg-transparent  text-dkblue py-4 px-6 border-4 border-dkblue hover:bg-ltblue rounded-3xl mountains-of-christmas-bold"
          type="submit"
        >
          New
        </button>
      </Form>
      <button
        className="inline-flex items-center my-12 text-6xl bg-transparent  text-dkblue py-4 px-6 border-4 border-dkblue hover:bg-ltblue rounded-3xl mountains-of-christmas-bold"
        onClick={onClick}
      >
        test
      </button>
    </>
  );
}
