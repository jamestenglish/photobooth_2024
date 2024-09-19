import { YETIS } from "~/constants";
import { COLORS } from "~/constants/colors";

export function createImageLoadPromise(img: HTMLImageElement) {
  return new Promise((resolve) => {
    img.onload = () => {
      resolve(true);
    };
  });
}

const SETTINGS = {
  WIDTH: 1200,
  HEIGHT: 1800,
  PICTURE_WIDTH: 566,
  PICTURE_HEIGHT: 426,
  INITIAL_X: 18,
  X_OFFSET: 600,
  Y_OFFSETS: [30, 477, 922],
  SECONDARY_COLOR: COLORS.SECONDARY,
  PRIMARY_COLOR: COLORS.PRIMARY,
  BG_COLOR: COLORS.BG,
  FRAME_WIDTH: 8,
  TEXT_OUTLINE_WIDTH: 8,
} as const;

export default async function drawCanvas({
  promiseRef,
  images,
  snipPng,
  yetiBgImages,
  yetiBgIndicies,
  setFinalImg,
}: {
  promiseRef: React.MutableRefObject<Promise<void>[]>;
  images: string[];
  snipPng: string;
  yetiBgImages: HTMLImageElement[];
  yetiBgIndicies: number[];
  setFinalImg: React.Dispatch<React.SetStateAction<string>>;
}) {
  await Promise.all(promiseRef.current);
  promiseRef.current = [Promise.resolve()];
  const snipImg = new Image();
  const templateImages = [new Image(), new Image(), new Image()];

  const promises = [...templateImages, snipImg].map((img) => {
    return createImageLoadPromise(img);
  });

  templateImages.forEach((img, index) => {
    img.src = images[index];
  });

  snipImg.src = snipPng;

  const canvas = document.getElementById("c") as HTMLCanvasElement;
  canvas.width = SETTINGS.WIDTH;
  canvas.height = SETTINGS.HEIGHT;
  const ctx = canvas.getContext("2d");
  await Promise.all(promises);

  if (ctx !== null) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = SETTINGS.BG_COLOR;
    ctx.fillRect(0, 0, SETTINGS.WIDTH, SETTINGS.HEIGHT);
    ctx.drawImage(snipImg, 0, 0);

    [0, SETTINGS.X_OFFSET].forEach((offset) => {
      SETTINGS.Y_OFFSETS.forEach((y, index) => {
        ctx.lineWidth = SETTINGS.FRAME_WIDTH;
        ctx.strokeStyle = SETTINGS.PRIMARY_COLOR;
        ctx.strokeRect(
          offset + (SETTINGS.INITIAL_X - SETTINGS.FRAME_WIDTH / 4),
          y - SETTINGS.FRAME_WIDTH / 4,
          SETTINGS.PICTURE_WIDTH + SETTINGS.FRAME_WIDTH / 2,
          SETTINGS.PICTURE_HEIGHT + SETTINGS.FRAME_WIDTH / 2,
        );

        const yetiBgImg = yetiBgImages[yetiBgIndicies[index]];

        ctx.drawImage(
          yetiBgImg,
          0,
          0,
          yetiBgImg.width,
          (SETTINGS.PICTURE_HEIGHT / SETTINGS.PICTURE_WIDTH) * yetiBgImg.height,
          SETTINGS.INITIAL_X + offset,
          y,
          SETTINGS.PICTURE_WIDTH,
          SETTINGS.PICTURE_HEIGHT,
        );
        ctx.drawImage(
          templateImages[index],
          SETTINGS.INITIAL_X + offset,
          y,
          SETTINGS.PICTURE_WIDTH,
          SETTINGS.PICTURE_HEIGHT,
        );
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

  const blob = await new Promise((resolve, reject) => {
    return canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject()),
      "image/png",
    );
  });
  setFinalImg(canvas.toDataURL("image/jpeg"));
}

export async function loadFonts(fontsToLoad: any) {
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
        `position:fixed; height:0; width:0; overflow:hidden; font-family:${fontFamily}; font-weight:${fontWeight}; font-style:${fontStyle}`,
      );
    }
  }
}
const fonts = [
  {
    "font-family": "Mountains of Christmas",
    "font-style": "normal",
    "font-weight": 700,
    src: "https://fonts.gstatic.com/s/mountainsofchristmas/v22/3y9z6a4zcCnn5X0FDyrKi2ZRUBIy8uxoUo7eBGqJJPxIO7yLeEE.woff2",
  },
];

export const yetiBgImages = YETIS.map(() => new Image());

export const loadStaticAssets = async ({
  yetiBgImages,
  setIsStaticLoaded,
}: {
  yetiBgImages: HTMLImageElement[];
  setIsStaticLoaded: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  await loadFonts(fonts);

  const promises = [...yetiBgImages].map((img) => {
    createImageLoadPromise(img);
  });

  yetiBgImages.forEach((img, index) => {
    img.src = YETIS[index];
  });

  await Promise.all(promises);
  setIsStaticLoaded(true);
};
