import { useCallback, useReducer, useEffect, useMemo } from "react";
import { FLASH_TIME_IN_MS, PREVIEW_TIME_IN_MS } from "~/constants";
import { AnimationStatusType } from "./useAnimation";
import { YETIS } from "~/constants";

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

export type ActionsType =
  | { type: "nextStatus" }
  | { type: "yetiizeStart" }
  | { type: "yetiizeFinish"; payload: YetiizeFinishPayloadType }
  | { type: "captureImg"; payload: string }
  | { type: "setOrigImg"; payload: number }
  | { type: "setBgImg"; payload: number }
  | { type: "shuffleYetiBgIndex"; payload: number };

type ActionType = ActionsType[keyof ActionsType];

export type StateType = {
  status: StatusType;
  imgIndex: 0 | 1 | 2;
  imgs: Array<string>;
  origImgs: Array<string>;
  bgImgs: Array<string>;
  yetiBgIndicies: Array<number>;
};

type StatusMapType = { [key in StatusType]: (state: StateType) => StatusType };

// const capturePreviewNextStatus = "noop";
const capturePreviewNextStatus = "animateStart";

const statusMap: StatusMapType = {
  ready: (state) => "countdown",
  countdown: (state) => "captureFlash",
  captureFlash: (state) => "capture",
  capture: (state) => "capturePreview",
  capturePreview: (state) => {
    const { imgs } = state;

    const capturePreviewNext =
      imgs.length < 3 ? "countdown" : capturePreviewNextStatus;
    return capturePreviewNext;
  },
  animateStart: (state) => "animateInProgress",
  animateInProgress: (state) => "yetiizeReady",
  yetiizeReady: (state) => "print",
  yetiizeStart: (state) => "yetiizeFinish",
  // TODO JTE: handle error
  yetiizeFinish: (state) => "yetiizeReady",
  print: (state) => "ready",
  noop: (state) => "noop",
};

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}
function getNextYetiIndex(prevIndex: number) {
  const newIndex = (prevIndex + 1) % YETIS.length;
  console.log("getNextYetiIndex", { newIndex });
  return newIndex;
}

function replace<Type>({
  index,
  array,
  value,
}: {
  index: number;
  array: Array<Type>;
  value: Type;
}) {
  return [
    ...array.slice(0, index),
    value,
    ...array.slice(index + 1, array.length),
  ];
}

const initialState: StateType = {
  imgIndex: 0,
  imgs: [],
  status: "ready",
  origImgs: [],
  bgImgs: [],
  yetiBgIndicies: [
    getRandomInt(YETIS.length),
    getRandomInt(YETIS.length),
    getRandomInt(YETIS.length),
  ],
};

const getNextStatus = ({
  currentState,
}: {
  currentState: StateType;
}): StatusType => {
  const { status } = currentState;

  const nextStatus = statusMap[status](currentState);

  return nextStatus;
};

const noAdvanceStatusActions: Array<ActionType> = [
  "captureImg",
  "shuffleYetiBgIndex",
  "setOrigImg",
  "setBgImg",
];

function reducerInner(state: StateType, action: ActionsType): StateType {
  const nextStatus = getNextStatus({
    currentState: state,
  });
  // TODO JTE reducer log
  // console.log(
  //   `reducer || shouldAdvance: ${!noAdvanceStatusActions.includes(action.type)} | type: ${action.type} | currentStatus: ${state.status} | nextStatus: ${nextStatus}`,
  //   { action, state }
  // );
  const { imgs } = state;
  switch (action.type) {
    case "yetiizeFinish":
      const { payload: payloadYetiizeFinish } = action;
      const { index, imgSrc } = payloadYetiizeFinish;
      const bgImgs = replace<string>({
        index,
        array: state.bgImgs,
        value: imgSrc,
      });

      let newYetiizeImgs = [...state.imgs] as Array<string>;
      if (bgImgs[index] !== null) {
        newYetiizeImgs = replace<string>({
          index,
          array: state.imgs,
          value: bgImgs[index],
        });
      }

      return {
        ...state,
        status: nextStatus,
        bgImgs: bgImgs,
        imgs: newYetiizeImgs,
      };

    case "nextStatus":
      return { ...state, status: nextStatus };
    case "yetiizeStart":
      return { ...state, status: "yetiizeStart" };
    // -------- types that don't change status
    case "setOrigImg":
      const { payload: setOrigImgIndex } = action;
      const newSetOrigImgs = replace<string>({
        index: setOrigImgIndex,
        array: state.imgs,
        value: state.origImgs[setOrigImgIndex],
      });
      return {
        ...state,
        imgs: newSetOrigImgs,
      };
    case "setBgImg":
      const { payload: setBgImgIndex } = action;
      const newSetBgImgs = replace<string>({
        index: setBgImgIndex,
        array: state.imgs,
        value: state.bgImgs[setBgImgIndex],
      });
      return {
        ...state,
        imgs: newSetBgImgs,
      };
    case "captureImg":
      const { payload: payloadCaptureImg } = action;
      const newImgs = [...imgs, payloadCaptureImg];
      const newBgImgs = newImgs.map(() => "");

      return { ...state, imgs: newImgs, origImgs: newImgs, bgImgs: newBgImgs };

    case "shuffleYetiBgIndex":
      const captureIndex = action.payload;
      const nextYetiBgIndex = getNextYetiIndex(
        state.yetiBgIndicies[captureIndex]
      );
      const newYetiBgIndicies = replace<number>({
        index: captureIndex,
        array: state.yetiBgIndicies,
        value: nextYetiBgIndex,
      });
      return {
        ...state,
        yetiBgIndicies: newYetiBgIndicies,
      };
  }
}

function reducerValidator(state: StateType, action: ActionsType): StateType {
  const newState = reducerInner(state, action);
  if (noAdvanceStatusActions.includes(action.type)) {
    if (newState.status !== state.status) {
      console.error("tried to advance", { action, state, newState });
      return { ...newState, status: state.status };
    }
  }
  return newState;
}

function reducer(state: StateType, action: ActionsType): StateType {
  // TODO JTE put in localstorage here
  const newState = reducerValidator(state, action);
  return newState;
}

export default function usePhotoboothState({
  startAnimation,
  animationStatus,
}: {
  startAnimation: () => void;
  animationStatus: AnimationStatusType;
}) {
  const [state, photoboothStateDispatch] = useReducer(reducer, initialState);
  const {
    status: statusRaw,
    imgs: imgsRaw,
    origImgs: origImgsRaw,
    bgImgs: bgImgsRaw,
    yetiBgIndicies: yetiBgIndiciesRaw,
  } = state;

  const status = useMemo(() => statusRaw, [statusRaw]);
  const imgs = useMemo(() => imgsRaw, [imgsRaw]);
  const origImgs = useMemo(() => origImgsRaw, [origImgsRaw]);
  const bgImgs = useMemo(() => bgImgsRaw, [bgImgsRaw]);
  const yetiBgIndicies = useMemo(() => yetiBgIndiciesRaw, [yetiBgIndiciesRaw]);

  useEffect(() => {
    const ids: Array<NodeJS.Timeout> = [];

    if (status === "captureFlash") {
      ids.push(
        setTimeout(() => {
          photoboothStateDispatch({ type: "nextStatus" });
        }, FLASH_TIME_IN_MS)
      );
    }

    if (status === "capturePreview") {
      ids.push(
        setTimeout(() => {
          photoboothStateDispatch({ type: "nextStatus" });
        }, PREVIEW_TIME_IN_MS)
      );
    }

    if (status === "animateStart" && animationStatus === "ready") {
      console.log("starting animation");
      startAnimation();
      photoboothStateDispatch({ type: "nextStatus" });
    }

    if (status === "animateInProgress" && animationStatus === "finished") {
      photoboothStateDispatch({ type: "nextStatus" });
    }

    if (status === "yetiizeFinish") {
      photoboothStateDispatch({ type: "nextStatus" });
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
    yetiBgIndicies,
    photoboothStateDispatch,
  };
}
