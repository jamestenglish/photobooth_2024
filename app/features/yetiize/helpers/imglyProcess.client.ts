import { removeBackground } from "@imgly/background-removal";

export async function processImage({
  imageBase64Url,
  name,
}: {
  imageBase64Url: string;
  name: string;
}): Promise<File> {
  const imgBlob = await removeBackground(imageBase64Url, {
    output: { quality: 1 },
    device: "cpu",
    debug: true,
  });

  const processedFile = new File([imgBlob], `${name}-bg-blasted.png`, {
    type: "image/png",
  });
  return processedFile;
}
