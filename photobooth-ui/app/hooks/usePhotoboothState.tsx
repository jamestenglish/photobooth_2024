import { useCallback, useReducer, useEffect, useMemo } from "react";
import { FLASH_TIME_IN_MS, PREVIEW_TIME_IN_MS } from "~/constants";
import { AnimationStatusType } from "./useAnimation";

export type StatusType =
  | "ready"
  | "countdown"
  | "captureFlash"
  | "capture"
  | "capturePreview"
  | "animateStart"
  | "animateInProgress"
  | "yetiizeReady"
  | "yetiizeStart"
  | "yetiizeFinish"
  | "print"
  | "noop";

type YetiizeFinishPayloadType = {
  imgSrc: string;
  index: number;
};

type ActionType =
  | { type: "nextState" }
  | { type: "yetiizeStart" }
  | { type: "yetiizeFinish"; payload: YetiizeFinishPayloadType }
  | { type: "captureImg"; payload: string };

export type StateType = {
  status: StatusType;
  imgIndex: 0 | 1 | 2;
  imgs: Array<string>;
  origImgs: Array<string>;
  bgImgs: Array<string>;
};

type StatusMapType = { [key in StatusType]: (state: StateType) => StatusType };

// const capturePreviewNextState = "noop";
const capturePreviewNextState = "animateStart";

const statusMap: StatusMapType = {
  ready: (state) => "countdown",
  countdown: (state) => "captureFlash",
  captureFlash: (state) => "capture",
  capture: (state) => "capturePreview",
  capturePreview: (state) => {
    const { imgs } = state;

    const capturePreviewNext =
      imgs.length < 3 ? "countdown" : capturePreviewNextState;
    return capturePreviewNext;
  },
  animateStart: (state) => "animateInProgress",
  animateInProgress: (state) => "yetiizeReady",
  yetiizeReady: (state) => "print",
  yetiizeStart: (state) => "yetiizeFinish",
  yetiizeFinish: (state) => "yetiizeReady",
  print: (state) => "ready",
  noop: (state) => "noop",
};

const initialState: StateType = {
  imgIndex: 0,
  imgs: [],
  status: "ready",
  origImgs: [],
  bgImgs: [],
};

const buttonPressState: StateType = {
  imgIndex: 0,
  imgs: [],
  status: "countdown",
  origImgs: [],
  bgImgs: [],
};

const getNextStatus = ({
  currentState,
}: {
  currentState: StateType;
}): StatusType => {
  // console.group("usePhotoboothState getNextStatus");
  const { status } = currentState;

  const nextStatus = statusMap[status](currentState);

  console.log(`currentStatus: ${status} | nextStatus: ${nextStatus}`);

  // console.groupEnd();
  return nextStatus;
};

function reducer(state: StateType, action: ActionType): StateType {
  // console.group("usePhotoboothState reducer");
  console.log({ action, state });
  const { imgs } = state;
  switch (action.type) {
    case "captureImg":
      // console.log("captureImg");
      const { payload: payloadCaptureImg } = action;
      const newImgs = [...imgs, payloadCaptureImg];
      const newBgImgs = newImgs.map(() => "");

      // console.groupEnd();
      return { ...state, imgs: newImgs, origImgs: newImgs, bgImgs: newBgImgs };
    case "yetiizeStart":
      return { ...state, status: "yetiizeStart" };
    case "yetiizeFinish":
      // console.log("nextState");
      const nextStatusYetiizeFinish = getNextStatus({
        currentState: state,
      });

      const { payload: payloadYetiizeFinish } = action;
      const { index, imgSrc } = payloadYetiizeFinish;
      const bgImgs = [...state.bgImgs];
      bgImgs[index] = imgSrc;

      // TODO JTE slice this
      const newYetiizeImgs = [...state.imgs] as Array<string>;
      if (bgImgs[index] !== null) {
        newYetiizeImgs[index] = bgImgs[index] as string;
      }

      // console.groupEnd();
      return {
        ...state,
        status: nextStatusYetiizeFinish,
        bgImgs: bgImgs,
        imgs: newYetiizeImgs,
      };
    case "nextState":
      // console.log("nextState");
      const nextStatus = getNextStatus({
        currentState: state,
      });

      // console.groupEnd();
      return { ...state, status: nextStatus };

    default:
      // console.groupEnd();
      return state;
  }
}

export default function usePhotoboothState({
  startAnimation,
  animationStatus,
}: {
  startAnimation: () => void;
  animationStatus: AnimationStatusType;
}) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    status: statusRaw,
    imgs: imgsRaw,
    origImgs: origImgsRaw,
    bgImgs: bgImgsRaw,
  } = state;

  const transitionState = useCallback(() => {
    dispatch({ type: "nextState" });
  }, [dispatch]);

  const captureImg = useCallback(
    (imgSrc: string) => {
      dispatch({ type: "captureImg", payload: imgSrc });
    },
    [dispatch]
  );

  const yetiizeStart = useCallback(() => {
    dispatch({ type: "yetiizeStart" });
  }, [dispatch]);

  const yetiizeFinish = useCallback(
    (imgSrc: string, index: number) => {
      dispatch({ type: "yetiizeFinish", payload: { imgSrc, index } });
    },
    [dispatch]
  );

  const status = useMemo(() => statusRaw, [statusRaw]);
  const imgs = useMemo(() => imgsRaw, [imgsRaw]);
  const origImgs = useMemo(() => origImgsRaw, [origImgsRaw]);
  const bgImgs = useMemo(() => bgImgsRaw, [bgImgsRaw]);

  useEffect(() => {
    console.log({ status, animationStatus });
    const ids: Array<NodeJS.Timeout> = [];

    if (status === "captureFlash") {
      ids.push(
        setTimeout(() => {
          dispatch({ type: "nextState" });
        }, FLASH_TIME_IN_MS)
      );
    }

    if (status === "capturePreview") {
      ids.push(
        setTimeout(() => {
          dispatch({ type: "nextState" });
        }, PREVIEW_TIME_IN_MS)
      );
    }

    if (status === "animateStart" && animationStatus === "ready") {
      console.log("starting animation");
      startAnimation();
      transitionState();
    }

    if (status === "animateInProgress" && animationStatus === "finished") {
      transitionState();
    }

    return () => {
      ids.forEach((id) => {
        if (id !== undefined) {
          clearTimeout(id);
        }
      });
    };
  }, [status, animationStatus]);

  return {
    status,
    imgs,
    origImgs,
    bgImgs,
    transitionState,
    captureImg,
    yetiizeFinish,
    yetiizeStart,
  };
}
