import { useState, useEffect, useRef } from "react";
import {
  env,
  AutoModel,
  AutoProcessor,
  RawImage,
} from "@huggingface/transformers";
import Countdowner from "./Countdowner";
import Flash from "./Flash";
import CapturePreview from "./CapturePreview";
import PhotoboothControls from "./PhotoboothControls";
import usePhotoboothState from "~/hooks/usePhotoboothState";
import { SCREEN_WIDTH, SCREEN_HEIGHT } from "~/constants";
import useAnimation from "~/hooks/useAnimation";
import {
  useAnimationRefs,
  usePhotoboothImages,
  usePhotoboothStateMethods,
  usePhotoboothStatus,
} from "./PhotoboothStateProvider";
import YetiizeLoading from "./YetiizeLoading";
import YetiizeControls from "./YetiizeControls";

// import { FullScreen, useFullScreenHandle } from "react-full-screen";

export default function Photobooth() {
  // const { containerRef, previousCapturesContainerRef, startAnimation } =
  //   useAnimation();
  // const { status, imgs, transitionState, captureImg } = usePhotoboothState({
  //   startAnimation,
  // });

  const modelRef = useRef(null);
  const processorRef = useRef(null);

  const [error, setError] = useState<any>("");
  const { captureImg, transitionState } = usePhotoboothStateMethods();
  const { imgs } = usePhotoboothImages();

  // const { containerRef } = useAnimationRefs();
  // const handle = useFullScreenHandle();

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       // @ts-ignore
  //       if (!navigator.gpu) {
  //         throw new Error("WebGPU is not supported in this browser.");
  //       }
  //       const model_id = "Xenova/modnet";
  //       // @ts-ignore
  //       env.backends.onnx.wasm.proxy = false;
  //       // @ts-ignore
  //       modelRef.current ??= await AutoModel.from_pretrained(model_id, {
  //         device: "webgpu",
  //       });
  //       // @ts-ignore
  //       processorRef.current ??= await AutoProcessor.from_pretrained(model_id);
  //     } catch (err) {
  //       console.error(err);
  //       setError(err);
  //     }
  //   })();
  // }, []);

  const status = usePhotoboothStatus();

  const onButtonPress = transitionState;

  const onCapture = (imgSrc: string) => {
    captureImg(imgSrc);
    transitionState();
  };

  const onCountdownFinished = transitionState;

  const lastImg = imgs.length > 0 ? imgs[imgs.length - 1] : undefined;

  return (
    <>
      <div
        style={{
          height: `${SCREEN_HEIGHT}px`,
          width: `${SCREEN_WIDTH}px`,
          maxHeight: `${SCREEN_HEIGHT}px`,
          maxWidth: `${SCREEN_WIDTH}px`,
          border: "2px solid purple",
        }}
        className="overflow-hidden"
      >
        <div
          className="grid grid-cols-3 grid-rows-3"
          style={{
            height: `${SCREEN_HEIGHT}px`,
            width: `${SCREEN_WIDTH}px`,
            maxHeight: `${SCREEN_HEIGHT}px`,
            maxWidth: `${SCREEN_WIDTH}px`,
          }}
        >
          <Flash />

          <Countdowner onCountdownFinished={onCountdownFinished} />

          <YetiizeLoading />
          <CapturePreview lastImg={lastImg} />

          <PhotoboothControls
            onButtonPress={onButtonPress}
            onCapture={onCapture}
          />

          <YetiizeControls />
        </div>
        <div
          style={{
            border: "5px solid orange",
            width: "400px",
            height: "1200px",
          }}
        >
          foo
        </div>
      </div>
      <div>
        <div className="whitespace-pre">status: {status}</div>
      </div>
    </>
  );
}
