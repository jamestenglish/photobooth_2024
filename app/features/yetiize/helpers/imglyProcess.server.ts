import { removeBackground } from "@imgly/background-removal";

export async function processImage({
  imgSrc,
  name,
}: {
  imgSrc: string;
  name: string;
}): Promise<File | null> {
  try {
    const imageBlob = await removeBackground(imgSrc, {
      output: { quality: 1 },
      device: "gpu",
      debug: true,
      fetchArgs: {
        mode: "no-cors",
      },
    });

    const processedFile = new File([imageBlob], `${name}-bg-blasted.png`, {
      type: "image/png",
    });
    return processedFile;
  } catch (error) {
    console.error(error);
  }
  return null;
}
