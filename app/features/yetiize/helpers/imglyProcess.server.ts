import { removeBackground } from "@imgly/background-removal";

export async function processImage({
  imageBase64Url,
  name,
}: {
  imageBase64Url: string;
  name: string;
}): Promise<File | null> {
  try {
    const imgBlob = await removeBackground(imageBase64Url, {
      output: { quality: 1 },
      device: "gpu",
      debug: true,
      fetchArgs: {
        mode: "no-cors",
      },
    });

    const processedFile = new File([imgBlob], `${name}-bg-blasted.png`, {
      type: "image/png",
    });
    return processedFile;
  } catch (error) {
    console.log("123");
    console.error(error);
  }
  return null;
}
