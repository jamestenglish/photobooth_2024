import {
  useLayoutEffect as useLayoutEffectOrig,
  useState,
  useRef,
  useMemo,
} from "react";
import { YETIIZE_STATUSES } from "~/constants";

import { YETIS } from "~/constants";
import snipPng from "~/images/snip.png";
import {
  usePhotoboothImages,
  usePhotoboothStateMethods,
  usePhotoboothStatus,
} from "~/features/photobooth-state/components/PhotoboothStateProvider";
import drawCanvas, {
  loadStaticAssets,
  yetiBgImages,
} from "../helpers/drawCanvas.client";

const canUseDOM = !!(
  typeof window !== "undefined" &&
  window.document &&
  window.document.createElement
);

const useLayoutEffect = canUseDOM ? useLayoutEffectOrig : () => {};

export default function Canvas() {
  const { yetiBgIndicies, images } = usePhotoboothImages();
  const { setFinalImg } = usePhotoboothStateMethods();

  const status = usePhotoboothStatus();

  const promiseRef = useRef([Promise.resolve()]);

  const [isStaticLoaded, setIsStaticLoaded] = useState(false);
  useLayoutEffect(() => {
    loadStaticAssets({
      yetiBgImages,
      setIsStaticLoaded,
    });
  }, []);

  // the size of dependencies can't change
  const useLayoutEffectImagesDependencies = [1, 2, 3].map((_, index) => {
    return images[index] ?? null;
  });

  const useLayoutEffectYetiBgIndiciesDependencies = [1, 2, 3].map(
    (_, index) => {
      return yetiBgIndicies[index] ?? null;
    }
  );

  useLayoutEffect(() => {
    console.log({ length: images.length, status, yetiBgIndicies });
    if (images.length === 3 && isStaticLoaded) {
      const promise = drawCanvas({
        promiseRef,
        images,
        snipPng,
        yetiBgImages,
        yetiBgIndicies,
        setFinalImg,
      });
      promiseRef.current.push(promise);
    }
  }, [
    ...useLayoutEffectImagesDependencies,
    ...useLayoutEffectYetiBgIndiciesDependencies,
    isStaticLoaded,
    images,
    yetiBgIndicies,
  ]);

  return (
    <>
      <div>
        Canvas:<canvas className="border-1 border-green" id="c"></canvas>
      </div>
    </>
  );
}
