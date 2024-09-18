import { removeBackground } from "@imgly/background-removal-node";

// function base64ToArrayBuffer(base64: string) {
//   var binaryString = atob(base64);
//   var bytes = new Uint8Array(binaryString.length);
//   for (var i = 0; i < binaryString.length; i++) {
//     bytes[i] = binaryString.charCodeAt(i);
//   }
//   return bytes.buffer;
// }
export async function processImage({
  imgSrc,
  name,
}: {
  imgSrc: string;
  name: string;
}): Promise<File | null> {
  try {
    console.log({ imgSrc, contains: imgSrc.includes("%") });
    const buf = Buffer.from(imgSrc, "base64url");
    const bufB = Buffer.from(imgSrc, "base64");
    // @ts-ignore
    const bufC = Buffer.from(imgSrc.split(",")[1], "base64");
    const uint = Uint8Array.from(buf);
    const url = new URL(imgSrc);
    const photoSrcBlob = new Blob([bufC], {
      type: "image/jpeg",
    });
    console.log("--------------");

    const arrayBuf = await photoSrcBlob.arrayBuffer();
    // const ab2 = base64ToArrayBuffer(imgSrc);
    const imgBlob = await removeBackground(photoSrcBlob, {
      output: { quality: 1 },
    });
    console.log("--------------");

    const processedFile = new File([imgBlob], `${name}-bg-blasted.png`, {
      type: "image/png",
    });
    return processedFile;
  } catch (err) {
    console.error(err);
    // throw err;
  }
  return null;
}
