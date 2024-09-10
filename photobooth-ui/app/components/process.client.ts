import {
  env,
  AutoModel,
  AutoProcessor,
  RawImage,
} from "@huggingface/transformers";

// TODO JTE move this file somewhere better

const model_id = "Xenova/modnet";
// @ts-ignore
env.backends.onnx.wasm.proxy = false;

const model = await AutoModel.from_pretrained(model_id, {
  device: "webgpu",
});
const processor = await AutoProcessor.from_pretrained(model_id);

export async function processImage({
  imageBase64Url,
  name,
}: {
  imageBase64Url: string;
  name: string;
}): Promise<File> {
  console.log({ imageBase64Url });
  const img = await RawImage.fromURL(imageBase64Url);

  // Pre-process image
  const { pixel_values } = await processor(img);
  // Predict alpha matte
  const { output } = await model({ input: pixel_values });

  const maskData = (
    await RawImage.fromTensor(output[0].mul(255).to("uint8")).resize(
      img.width,
      img.height
    )
  ).data;

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
  for (let i = 0; i < maskData.length; ++i) {
    pixelData.data[4 * i + 3] = maskData[i];
  }
  ctx.putImageData(pixelData, 0, 0);
  // Convert canvas to blob
  const blob = await new Promise((resolve, reject) =>
    canvas.toBlob((blob) => (blob ? resolve(blob) : reject()), "image/png")
  );
  // @ts-ignore
  const processedFile = new File([blob], `${name}-bg-blasted.png`, {
    type: "image/png",
  });
  return processedFile;
}
