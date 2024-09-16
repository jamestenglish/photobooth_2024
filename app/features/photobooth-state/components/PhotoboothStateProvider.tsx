import { createContext, useContext, useReducer, useMemo } from "react";
import usePhotoboothState, {
  ActionsType,
  StatusType,
} from "~/features/photobooth-state/hooks/usePhotoboothState";
import { AnimationStatusType } from "~/features/photobooth-state/hooks/useAnimation";

export type PhotoboothMethodsType = {
  photoboothStateDispatch: React.Dispatch<ActionsType>;
};

export type PhotoboothImagesType = {
  imgs: Array<string>;
  origImgs: Array<string>;
  bgImgs: Array<string>;
  yetiBgIndicies: Array<number>;
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
    yetiBgIndicies,
    photoboothStateDispatch,
  } = usePhotoboothState({
    startAnimation,
    animationStatus,
  });

  // I don't really think this is necessary
  const methodsValue = useMemo(() => {
    return { photoboothStateDispatch };
  }, [photoboothStateDispatch]);

  const imgsValue = { imgs, origImgs, bgImgs, yetiBgIndicies };
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
