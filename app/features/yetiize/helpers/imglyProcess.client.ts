import { removeBackground } from "@imgly/background-removal";

export async function processImage({
  imgSrc,
  name,
}: {
  imgSrc: string;
  name: string;
}): Promise<File> {
  const imageBlob = await removeBackground(imgSrc, {
    output: { quality: 1 },
    device: "cpu",
    debug: true,
  });

  const processedFile = new File([imageBlob], `${name}-bg-blasted.png`, {
    type: "image/png",
  });
  return processedFile;
}
