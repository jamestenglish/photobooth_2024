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
  SECONDARY_COLOR: "#D5E8F2",
  PRIMARY_COLOR: "#004681",
  BG_COLOR: "#F6F5FA",
  FRAME_WIDTH: 8,
  TEXT_OUTLINE_WIDTH: 8,
} as const;

export default async function drawCanvas({
  promiseRef,
  imgs,
  snipPng,
  yetiImgs,
  yetiBgIndicies,
  setFile,
}: {
  promiseRef: React.MutableRefObject<Promise<void>[]>;
  imgs: string[];
  snipPng: string;
  yetiImgs: HTMLImageElement[];
  yetiBgIndicies: number[];
  setFile: React.Dispatch<React.SetStateAction<string>>;
}) {
  await Promise.all(promiseRef.current);
  promiseRef.current = [Promise.resolve()];
  console.group("draw");
  console.log({ length: promiseRef.current.length });
  console.log({ foo: promiseRef.current[0] });
  console.log("drawing canvas");
  const snipImg = new Image();
  const templateImgs = [new Image(), new Image(), new Image()];

  const promises = [...templateImgs, snipImg].map((img) => {
    return createImageLoadPromise(img);
  });

  templateImgs.forEach((img, index) => {
    img.src = imgs[index];
  });

  snipImg.src = snipPng;

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
    ctx.drawImage(snipImg, 0, 0);

    [0, SETTINGS.X_OFFSET].forEach((offset) => {
      SETTINGS.Y_OFFSETS.forEach((y, index) => {
        ctx.lineWidth = SETTINGS.FRAME_WIDTH;
        ctx.strokeStyle = SETTINGS.PRIMARY_COLOR;
        ctx.strokeRect(
          offset + (SETTINGS.INITIAL_X - SETTINGS.FRAME_WIDTH / 4),
          y - SETTINGS.FRAME_WIDTH / 4,
          SETTINGS.PICTURE_WIDTH + SETTINGS.FRAME_WIDTH / 2,
          SETTINGS.PICTURE_HEIGHT + SETTINGS.FRAME_WIDTH / 2
        );
        // ctx.reset();

        const yetiImage = yetiImgs[yetiBgIndicies[index]];

        ctx.drawImage(
          yetiImage,
          0,
          0,
          yetiImage.width,
          (SETTINGS.PICTURE_HEIGHT / SETTINGS.PICTURE_WIDTH) * yetiImage.height,
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

  // const canvas = document.getElementById("c") as HTMLCanvasElement;

  // console.log({ canvas });
  const blob = await new Promise((resolve, reject) => {
    return canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject()),
      "image/png"
    );
  });
  setFile(canvas.toDataURL("image/jpeg"));
  console.groupEnd();
}
