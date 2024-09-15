import { createContext, useContext, useReducer, useMemo } from "react";
import usePhotoboothState, { StatusType } from "~/hooks/usePhotoboothState";
import { AnimationStatusType } from "~/hooks/useAnimation";

export type PhotoboothMethodsType = {
  transitionState: () => void;
  captureImg: (imgSrc: string) => void;
  yetiizeFinish: (imgSrc: string, index: number) => void;
  yetiizeStart: () => void;
};

export type PhotoboothImagesType = {
  imgs: Array<string>;
  origImgs: Array<string>;
  bgImgs: Array<string>;
};

export type PhotoboothAnimationRefsType = {
  containerRef: React.RefObject<HTMLDivElement>;
  previousCapturesContainerRef: React.RefObject<HTMLDivElement>;
  webcamDisplayRef: React.RefObject<HTMLDivElement>;
};

const PhotoboothStatusContext = createContext<StatusType>("ready");
const PhotoboothMethodsContext = createContext<PhotoboothMethodsType | {}>(
  {}
) as React.Context<PhotoboothMethodsType>;

const PhotoboothImgsContext = createContext<PhotoboothImagesType | {}>(
  {}
) as React.Context<PhotoboothImagesType>;

const PhotoboothAnimationRefsContext = createContext<
  PhotoboothAnimationRefsType | {}
>({}) as React.Context<PhotoboothAnimationRefsType>;

export default function PhotoboothStateProvider({
  children,
  startAnimation,
  animationStatus,
  containerRef,
  previousCapturesContainerRef,
  webcamDisplayRef,
}: {
  children: React.ReactNode;
  startAnimation: () => void;
  animationStatus: AnimationStatusType;
  containerRef: React.RefObject<HTMLDivElement>;
  previousCapturesContainerRef: React.RefObject<HTMLDivElement>;
  webcamDisplayRef: React.RefObject<HTMLDivElement>;
}) {
  const {
    status,
    imgs,
    origImgs,
    bgImgs,
    transitionState,
    captureImg,
    yetiizeFinish,
    yetiizeStart,
  } = usePhotoboothState({
    startAnimation,
    animationStatus,
  });

  // I don't really think this is necessary
  const methodsValue = useMemo(() => {
    return { transitionState, captureImg, yetiizeFinish, yetiizeStart };
  }, [transitionState, captureImg, yetiizeFinish, yetiizeStart]);

  const imgsValue = { imgs, origImgs, bgImgs };
  const animationRefs = {
    containerRef,
    previousCapturesContainerRef,
    webcamDisplayRef,
  };

  return (
    <PhotoboothAnimationRefsContext.Provider value={animationRefs}>
      <PhotoboothMethodsContext.Provider value={methodsValue}>
        <PhotoboothStatusContext.Provider value={status}>
          <PhotoboothImgsContext.Provider value={imgsValue}>
            {children}
          </PhotoboothImgsContext.Provider>
        </PhotoboothStatusContext.Provider>
      </PhotoboothMethodsContext.Provider>
    </PhotoboothAnimationRefsContext.Provider>
  );
}

export function usePhotoboothStatus() {
  return useContext(PhotoboothStatusContext);
}

export function usePhotoboothStateMethods() {
  return useContext(PhotoboothMethodsContext);
}

export function usePhotoboothImages() {
  return useContext(PhotoboothImgsContext);
}

export function useAnimationRefs() {
  return useContext(PhotoboothAnimationRefsContext);
}
