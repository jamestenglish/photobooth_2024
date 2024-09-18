import { RawImage } from "@huggingface/transformers";

export default async function toPng({
  imgSrc,
  name,
}: {
  imgSrc: string;
  name: string;
}): Promise<string> {
  const img = await RawImage.fromURL(imgSrc);

  // Create new canvas
  const canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not get 2d context");
  // Draw original image output to canvas
  ctx.drawImage(img.toCanvas(), 0, 0);

  // Update alpha channel
  const pixelData = ctx.getImageData(0, 0, img.width, img.height);

  ctx.putImageData(pixelData, 0, 0);
  // Convert canvas to blob

  return canvas.toDataURL("image/png");
}
