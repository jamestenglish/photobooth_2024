import { useRef, useState, useEffect } from "react";
import { processImage } from "./process.client";

export default function PreviousCaptures({ imgs }: { imgs: Array<string> }) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [src, setSrc] = useState<string>("");

  // TODO JTE this is ugly just for testing
  useEffect(() => {
    if (src !== "") {
      console.log({ src });
      const go = async () => {
        const resultFile = await processImage({
          imageBase64Url: src,
          name: "a",
        });

        console.group("yeti-ize on click");

        const b64 = URL.createObjectURL(resultFile);
        console.log({ resultFile, b64 });

        // @ts-ignore
        imgRef.current.src = b64;
        console.groupEnd();
      };
      go();
    }
  }, [src]);
  const imgTags = imgs.map((src, index) => {
    // normally index's are bad keys but this won't be reordered
    return (
      <div className="flex flex-col gap-6 items-center">
        <img
          ref={imgRef}
          className="preview-img object-scale-down max-h-80"
          src={src}
          style={{ border: "1px solid red" }}
          key={index}
        />

        <button
          onClick={async () => {
            // @ts-ignore
            const src = imgRef.current.src;
            setSrc(src);
          }}
          className="my-12 text-5xl bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-4 px-6 border-4 border-blue-500 hover:border-transparent rounded-full"
        >
          Yeti-ize!
        </button>
      </div>
    );
  });

  return <>{imgTags}</>;
}
