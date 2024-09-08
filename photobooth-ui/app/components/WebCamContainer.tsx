import { useCallback, useReducer, useEffect } from "react";
import WebCamDisplay from "./WebCamDisplay";
import Countdowner from "./Countdowner";
import Flash from "./Flash";
import PreviousCaptures from "./PreviousCaptures";
import CapturePreview from "./CapturePreview";

const FLASH_TIME_IN_MS = 200;
const PREVIEW_TIME_IN_MS = 3000;

export type StatusType =
  | "ready"
  | "countdown"
  | "captureFlash"
  | "capture"
  | "capturePreview"
  | "print";

type ActionType = { type: "nextState"; payload?: string };

export type StateType = {
  status: StatusType;
  imgIndex: 0 | 1 | 2;
  imgs: Array<string>;
};

const getNextStatus = ({
  currentState,
}: {
  currentState: StateType;
}): StatusType => {
  const { imgs, status } = currentState;

  switch (status) {
    case "ready":
      return "countdown";
    case "countdown":
      return "captureFlash";
    case "captureFlash":
      return "capture";
    case "capture":
      return "capturePreview";
    case "capturePreview":
      const capturePreviewNext = imgs.length < 3 ? "countdown" : "print";
      return capturePreviewNext;
    default:
      return "ready";
  }
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

function reducer(state: StateType, action: ActionType): StateType {
  console.log({ action, state });
  const { imgs, status } = state;
  switch (action.type) {
    case "nextState":
      const nextStatus = getNextStatus({
        currentState: state,
      });
      if (status === "capture" && action.payload !== undefined) {
        const newImgs = [...imgs, action.payload];
        return { ...state, imgs: newImgs, status: nextStatus };
      }
      return { ...state, status: nextStatus };
    default:
      return state;
  }
}

export default function WebCamContainer() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { status, imgs } = state;

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
    return () => {
      ids.forEach((id) => {
        if (id !== undefined) {
          clearTimeout(id);
        }
      });
    };
  }, [status]);

  const onButtonPress = useCallback(() => {
    dispatch({ type: "nextState" });
  }, [dispatch]);

  const onCapture = useCallback(
    (imgSrc: string) => {
      dispatch({ type: "nextState", payload: imgSrc });
    },
    [dispatch]
  );

  const onCountdownFinished = useCallback(() => {
    dispatch({ type: "nextState" });
  }, [dispatch]);

  const lastImg = imgs.length > 0 ? imgs[imgs.length - 1] : undefined;

  return (
    <>
      <Flash status={status} />
      <CapturePreview lastImg={lastImg} status={status} />
      <WebCamDisplay
        onButtonPress={onButtonPress}
        onCapture={onCapture}
        status={status}
      />
      <Countdowner status={status} onCountdownFinished={onCountdownFinished} />
      <PreviousCaptures imgs={imgs} />
    </>
  );
}
