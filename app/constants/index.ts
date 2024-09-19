import { StatusType } from "~/features/photobooth-state/hooks/usePhotoboothState";
export { YETIS } from "./yetis";

// export const MOCK_PRINT = false;
export const MOCK_PRINT = true;

// export const DO_QUERY_PRINTER_PRINTER = true;
export const DO_QUERY_PRINTER_PRINTER = false;

const isNormal = false;

export const PRINTER_POLL_RATE = isNormal ? 10000 : 3000;

export const COUNTDOWN_TIME_IN_MS = isNormal ? 1000 : 500;

export const PREVIEW_TIME_IN_MS = isNormal ? 3000 : 500;

export const ANIMATION_DURATION_MS = isNormal ? 1000 : 500;

export const MAX_PRINTER_STATUS_CHECKS = 30;

export const MAX_HEIGHT_TARGET_RM = 26;
export const MAX_HEIGHT_START_RM = 12;
export const COLUMN_GAP_TARGET_RM = 0.5;
export const COLUMN_GAP_START_RM = 0.5;

export const SCREEN_HEIGHT = 800;
export const SCREEN_WIDTH = 1280;

export const CAMERA_WIDTH_ASPECT = 3;
export const CAMERA_HEIGHT_ASPECT = 4;

export const WEBCAM_HEIGHT = Math.trunc((5 / 7) * SCREEN_HEIGHT);
export const WEBCAM_WIDTH = Math.trunc(WEBCAM_HEIGHT * (4 / 3));

export const YETIIZE_STATUSES: StatusType[] = [
  "yetiizeReady",
  "yetiizeStart",
  "yetiizeFinish",
];

export const PRINTER_URL = "http://10.0.0.145:631/";

export const FLASH_TIME_IN_MS = 200;
// export const FLASH_TIME_IN_MS = 20000;
console.log({ SCREEN_HEIGHT, SCREEN_WIDTH, WEBCAM_HEIGHT, WEBCAM_WIDTH });
