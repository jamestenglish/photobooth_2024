import { useLayoutEffect } from "react";
import { YETIS } from "~/constants";
import templateImg from "~/images/template.png";
import {
  usePhotoboothImages,
  usePhotoboothStatus,
} from "./PhotoboothStateProvider";

const WIDTH = 1200;
const HEIGHT = 1800;

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
      console.log(fontFamily, "loaded");

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

  useLayoutEffect(() => {
    console.log({ length: imgs.length, status, yetiBgIndicies });
    if (imgs.length === 3) {
      const draw = async () => {
        await loadFonts(fonts);
        const template = new Image(WIDTH, HEIGHT);
        const templateImgs = [new Image(), new Image(), new Image()];
        const yetiImgs = YETIS.map(() => new Image());

        const promises = [template, ...templateImgs, ...yetiImgs].map((img) => {
          createImageLoadPromise(img);
        });

        templateImgs.forEach((img, index) => {
          img.src = imgs[index];
        });

        yetiImgs.forEach((img, index) => {
          img.src = YETIS[index];
        });

        template.src = templateImg;

        const canvas = document.getElementById("c") as HTMLCanvasElement;
        canvas.width = WIDTH;
        canvas.height = HEIGHT;
        const ctx = canvas.getContext("2d");
        await Promise.all(promises);

        if (ctx !== null) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          ctx.drawImage(template, 0, 0);

          const w = 566;
          const h = 426;
          const x = 18;

          const xOffset = 600;

          const yPosts = [30, 477, 922];

          yPosts.forEach((y, index) => {
            const yetiImage = yetiImgs[yetiBgIndicies[index]];
            ctx.drawImage(
              yetiImage,
              0,
              0,
              yetiImage.width,
              (h / w) * yetiImage.height,
              x,
              y,
              w,
              h
            );
            ctx.drawImage(templateImgs[index], x, y, w, h);

            ctx.drawImage(
              yetiImage,
              0,
              0,
              yetiImage.width,
              (h / w) * yetiImage.height,
              x + xOffset,
              y,
              w,
              h
            );
            ctx.drawImage(templateImgs[index], x + xOffset, y, w, h);
          });

          ctx.font = `normal 700 120px "Mountains of Christmas"`;
          ctx.textAlign = "center";
          ctx.fillStyle = "#D5E8F2";
          ctx.strokeStyle = "#004681";
          ctx.lineWidth = 8;
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
      };

      draw();
    }
  }, [imgs, yetiBgIndicies, status]);

  return <></>;
}
