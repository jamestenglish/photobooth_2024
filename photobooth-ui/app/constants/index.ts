export const SCREEN_HEIGHT = 1200;
export const SCREEN_WIDTH = 1920;

export const WEBCAM_HEIGHT = Math.trunc((SCREEN_HEIGHT * 4) / 7);
export const WEBCAM_WIDTH = Math.trunc(
  (WEBCAM_HEIGHT * SCREEN_WIDTH) / SCREEN_HEIGHT
);

console.log({ SCREEN_HEIGHT, SCREEN_WIDTH, WEBCAM_HEIGHT, WEBCAM_WIDTH });

// export const COUNTDOWN_TIME_IN_MS = 1000;
export const COUNTDOWN_TIME_IN_MS = 100;
export const FLASH_TIME_IN_MS = 200;
// export const FLASH_TIME_IN_MS = 20000;
// export const PREVIEW_TIME_IN_MS = 3000;
export const PREVIEW_TIME_IN_MS = 200;

export const MAX_HEIGHT_TARGET_RM = 26;
export const MAX_HEIGHT_START_RM = 20;
export const COLUMN_GAP_TARGET_RM = 4.5;
export const COLUMN_GAP_START_RM = 0.5;

export const ANIMATION_DURATION_MS = 2000;
