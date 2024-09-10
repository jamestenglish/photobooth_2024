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
import { SCREEN_WIDTH, SCREEN_HEIGHT } from "constants/sizes";
import useAnimation from "~/hooks/useAnimation";

export default function Photobooth() {
  const { containerRef, previousCapturesContainerRef, startAnimation } =
    useAnimation();
  const { status, imgs, transitionState, captureImg } = usePhotoboothState({
    startAnimation,
  });

  const modelRef = useRef(null);
  const processorRef = useRef(null);

  const [error, setError] = useState<any>("");
  useEffect(() => {
    (async () => {
      try {
        // @ts-ignore
        if (!navigator.gpu) {
          throw new Error("WebGPU is not supported in this browser.");
        }
        const model_id = "Xenova/modnet";
        // @ts-ignore
        env.backends.onnx.wasm.proxy = false;
        // @ts-ignore
        modelRef.current ??= await AutoModel.from_pretrained(model_id, {
          device: "webgpu",
        });
        // @ts-ignore
        processorRef.current ??= await AutoProcessor.from_pretrained(model_id);
      } catch (err) {
        console.error(err);
        setError(err);
      }
    })();
  }, []);

  const onButtonPress = transitionState;

  const onCapture = (imgSrc: string) => {
    captureImg(imgSrc);
    transitionState();
  };

  const onCountdownFinished = transitionState;

  const lastImg = imgs.length > 0 ? imgs[imgs.length - 1] : undefined;

  const areControlsVisible = status !== "capturePreview";

  console.group("Photobooth");
  console.log(`status: ${status} | areControlsVisible: ${areControlsVisible}`);
  console.groupEnd();

  return (
    <>
      <div
        ref={containerRef}
        style={{
          height: `${SCREEN_HEIGHT}px`,
          width: `${SCREEN_WIDTH}px`,
          maxHeight: `${SCREEN_HEIGHT}px`,
          maxWidth: `${SCREEN_WIDTH}px`,
          border: "2px solid purple",
        }}
        className="overflow-hidden"
      >
        <Flash status={status} />

        <Countdowner
          status={status}
          onCountdownFinished={onCountdownFinished}
        />

        <div
          className="flex flex-col gap-6 h-full items-center"
          style={{ border: "1px green" }}
        >
          <CapturePreview lastImg={lastImg} status={status} />

          <PhotoboothControls
            onButtonPress={onButtonPress}
            onCapture={onCapture}
            status={status}
            imgs={imgs}
            previousCapturesContainerRef={previousCapturesContainerRef}
          />
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
    </>
  );
}
