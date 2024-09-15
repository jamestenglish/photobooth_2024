import { useRef, useState, useEffect, Dispatch } from "react";
import { processImage } from "./process.client";
import { usePhotoboothStateMethods } from "./PhotoboothStateProvider";
import { YETIS } from "~/constants";
import icon1 from "~/images/yeti-cameria-icon-1-removebg-preview.png";
import icon2 from "~/images/yeti-camera-icon-2-removebg-preview.png";
import icon3 from "~/images/yeti-camera-icon-3-removebg-preview.png";

const icons = [icon1, icon2, icon3];

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

export default function YetiizeCaptureContainer({
  src,
  index,
  bgImg,
}: {
  src: string;
  index: number;
  bgImg: string;
}) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [processSrc, setProcessSrc] = useState<string>("");
  const { yetiizeStart, yetiizeFinish } = usePhotoboothStateMethods();

  const [bgIndex, setBgIndex] = useState<number>(getRandomInt(YETIS.length));

  useEffect(() => {
    console.log("useEffect");
    let id: NodeJS.Timeout;
    if (bgImg === "") {
      if (processSrc !== "") {
        yetiizeStart();
        const proccessImageEffect = async () => {
          try {
            const resultFile = await processImage({
              imageBase64Url: src,
              name: `${index}`,
            });

            const b64 = URL.createObjectURL(resultFile);

            setProcessSrc("");
            yetiizeFinish(b64, index);
            setBgIndex((prev) => {
              return (prev + 1) % YETIS.length;
            });
          } catch (err) {
            // TODO JTE handle error
            yetiizeFinish("error", index);
          }
        };
        // This wrecks everything (on slow processors)
        // want to make sure the image paints
        // and everything is done before this gets
        // kicked off
        id = setTimeout(() => {
          proccessImageEffect();
        }, 1000);
      }
    } else {
      if (processSrc !== "") {
        setBgIndex((prev) => {
          const newIndex = (prev + 1) % YETIS.length;
          console.log({ newIndex });
          return newIndex;
        });
        setProcessSrc("");
      }
    }
    return () => {
      if (id) {
        clearTimeout(id);
      }
    };
  }, [processSrc, bgImg]);
  return (
    <div className="flex flex-col gap-6 items-center mt-6">
      <div className="grid grid-col-1 grid-row-1">
        <div className="row-start-1 col-start-1 max-h-[316px] max-w-[424px] overflow-hidden">
          <img
            className="preview-img object-fill max-w-full"
            src={YETIS[bgIndex]}
            style={{ border: "1px solid red" }}
          />
        </div>
        <img
          ref={imgRef}
          className="preview-img object-scale-down row-start-1 col-start-1 "
          src={src}
          style={{ border: "1px solid red" }}
        />
      </div>
      <button
        onClick={() => {
          console.log("click");
          // @ts-ignore
          const src = imgRef.current.src;
          setProcessSrc(src);
        }}
        className="inline-flex items-center my-12 text-5xl bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-4 px-6 border-4 border-blue-500 hover:border-transparent rounded-full"
      >
        <img
          src={icons[index]}
          alt="yeti icon"
          className="fill-current w-14 h-14 mr-2"
        />
        <span>Yeti-ize!</span>
      </button>
    </div>
  );
}
