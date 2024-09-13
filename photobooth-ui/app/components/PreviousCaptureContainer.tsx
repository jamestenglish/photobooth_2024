import { useRef, useState, useEffect, Dispatch } from "react";
import { processImage } from "./process.client";

export default function PreviousCaptureContainer({
  src,
  index,
  setIsLoading,
  setError,
}: {
  src: string;
  index: number;
  setIsLoading: Dispatch<boolean>;
  setError: Dispatch<unknown | null>;
}) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [processSrc, setProcessSrc] = useState<string>("");
  const [newSrc, setNewSrc] = useState<string | null>();

  useEffect(() => {
    if (processSrc !== "") {
      console.log({ src });
      setIsLoading(true);
      const proccessImageEffect = async () => {
        try {
          const resultFile = await processImage({
            imageBase64Url: src,
            name: `${index}`,
          });

          console.group("yeti-ize on click");

          const b64 = URL.createObjectURL(resultFile);
          console.log({ resultFile, b64 });

          setNewSrc(b64);
          console.groupEnd();
        } catch (err) {
          setError(err);
        }
      };
      proccessImageEffect();
    }
  }, [processSrc]);
  return (
    <div className="flex flex-col gap-6 items-center">
      <img
        ref={imgRef}
        className="preview-img object-scale-down max-h-80"
        src={newSrc ?? src}
        style={{ border: "1px solid red" }}
      />

      <button
        onClick={async () => {
          // @ts-ignore
          const src = imgRef.current.src;
          setProcessSrc(src);
        }}
        className="my-12 text-5xl bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-4 px-6 border-4 border-blue-500 hover:border-transparent rounded-full"
      >
        Yeti-ize!
      </button>
    </div>
  );
}
