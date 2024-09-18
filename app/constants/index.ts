import { StatusType } from "~/features/photobooth-state/hooks/usePhotoboothState";
export { YETIS } from "./yetis";

// export const MOCK_PRINT = false;
export const MOCK_PRINT = true;

// export const IS_PRINTER = true;
export const IS_PRINTER = false;

export const SCREEN_HEIGHT = 800;
export const SCREEN_WIDTH = 1280;

export const CAMERA_WIDTH_ASPECT = 3;
export const CAMERA_HEIGHT_ASPECT = 4;

export const WEBCAM_HEIGHT = Math.trunc((5 / 7) * SCREEN_HEIGHT);
export const WEBCAM_WIDTH = Math.trunc(WEBCAM_HEIGHT * (4 / 3));

const isNormal = true;

export const PRINTER_POLL_RATE = isNormal ? 10000 : 1000;

export const COUNTDOWN_TIME_IN_MS = isNormal ? 1000 : 500;

export const PREVIEW_TIME_IN_MS = isNormal ? 3000 : 500;

export const ANIMATION_DURATION_MS = isNormal ? 1000 : 500;

export const MAX_HEIGHT_TARGET_RM = 26;
export const MAX_HEIGHT_START_RM = 12;
export const COLUMN_GAP_TARGET_RM = 0.5;
export const COLUMN_GAP_START_RM = 0.5;

// 2592x1944 4:3

export const YETIIZE_STATUSES: StatusType[] = [
  "yetiizeReady",
  "yetiizeStart",
  "yetiizeFinish",
  // "print",
];

export const PRINTER_URL = "http://10.0.0.145:631/";

export const FLASH_TIME_IN_MS = 200;
// export const FLASH_TIME_IN_MS = 20000;
console.log({ SCREEN_HEIGHT, SCREEN_WIDTH, WEBCAM_HEIGHT, WEBCAM_WIDTH });
