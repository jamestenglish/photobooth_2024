import { useCallback, useReducer, useEffect, useMemo } from "react";
import { FLASH_TIME_IN_MS, PREVIEW_TIME_IN_MS } from "constants/sizes";

export type StatusType =
  | "ready"
  | "countdown"
  | "captureFlash"
  | "capture"
  | "capturePreview"
  | "animateStart"
  | "animateInProgress"
  | "print";

type ActionType =
  | { type: "nextState" }
  | { type: "captureImg"; payload: string };

export type StateType = {
  status: StatusType;
  imgIndex: 0 | 1 | 2;
  imgs: Array<string>;
};

type StatusMapType = { [key in StatusType]: (state: StateType) => StatusType };

const statusMap: StatusMapType = {
  ready: (state) => "countdown",
  countdown: (state) => "captureFlash",
  captureFlash: (state) => "capture",
  capture: (state) => "capturePreview",
  capturePreview: (state) => {
    const { imgs } = state;

    const capturePreviewNext = imgs.length < 3 ? "countdown" : "animateStart";
    return capturePreviewNext;
  },
  animateStart: (state) => "animateInProgress",
  animateInProgress: (state) => "print",
  print: (state) => "ready",
};

const initialState: StateType = {
  imgIndex: 0,
  imgs: [],
  status: "ready",
};

const buttonPressState: StateType = {
  imgIndex: 0,
  imgs: [],
  status: "countdown",
};

const getNextStatus = ({
  currentState,
}: {
  currentState: StateType;
}): StatusType => {
  console.group("usePhotoboothState getNextStatus");
  const { status } = currentState;

  const nextStatus = statusMap[status](currentState);

  console.log(`currentStatus: ${status} | nextStatus: ${nextStatus}`);

  console.groupEnd();
  return nextStatus;
};

function reducer(state: StateType, action: ActionType): StateType {
  console.group("usePhotoboothState reducer");
  console.log({ action, state });
  const { imgs, status } = state;
  switch (action.type) {
    case "captureImg":
      console.log("captureImg");
      const { payload } = action;
      const newImgs = [...imgs, payload];

      console.groupEnd();
      return { ...state, imgs: newImgs };

    case "nextState":
      console.log("nextState");
      const nextStatus = getNextStatus({
        currentState: state,
      });

      console.groupEnd();
      return { ...state, status: nextStatus };

    default:
      console.groupEnd();
      return state;
  }
}

export default function usePhotoboothState({
  startAnimation,
}: {
  startAnimation: () => void;
}) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { status: statusRaw, imgs: imgsRaw } = state;

  const transitionState = useCallback(() => {
    dispatch({ type: "nextState" });
  }, [dispatch]);

  const captureImg = useCallback(
    (imgSrc: string) => {
      dispatch({ type: "captureImg", payload: imgSrc });
    },
    [dispatch]
  );

  const status = useMemo(() => statusRaw, [statusRaw]);
  const imgs = useMemo(() => imgsRaw, [imgsRaw]);

  useEffect(() => {
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

    if (status === "animateStart") {
      startAnimation();
      transitionState();
    }

    return () => {
      ids.forEach((id) => {
        if (id !== undefined) {
          clearTimeout(id);
        }
      });
    };
  }, [status]);

  return { status, imgs, transitionState, captureImg };
}
