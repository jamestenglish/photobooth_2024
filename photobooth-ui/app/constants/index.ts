import yeti1 from "~/images/yeti-1-big.png";
import yeti2 from "~/images/yeti-2-big.png";
import yeti3 from "~/images/yeti-3-big.png";
import yeti4 from "~/images/yeti-4-big.png";

import yeti5 from "~/images/yeti-5-big.png";
import yeti6 from "~/images/yeti-6-big.png";
import yeti7 from "~/images/yeti-7-big.png";
import yeti8 from "~/images/yeti-8-big.png";
import yeti9 from "~/images/yeti-9-big.png";
import yeti10 from "~/images/yeti-10-big.png";

export const YETIS = [
  yeti1,
  yeti2,
  yeti3,
  yeti4,
  yeti5,
  yeti6,
  yeti7,
  yeti8,
  yeti9,
  yeti10,
];

export const SCREEN_HEIGHT = 800;
export const SCREEN_WIDTH = 1280;

export const CAMERA_WIDTH_ASPECT = 3;
export const CAMERA_HEIGHT_ASPECT = 4;

export const WEBCAM_HEIGHT = Math.trunc((5 / 7) * SCREEN_HEIGHT);
export const WEBCAM_WIDTH = Math.trunc(WEBCAM_HEIGHT * (4 / 3));

console.log({ SCREEN_HEIGHT, SCREEN_WIDTH, WEBCAM_HEIGHT, WEBCAM_WIDTH });

// export const COUNTDOWN_TIME_IN_MS = 1000;
export const COUNTDOWN_TIME_IN_MS = 100;

export const FLASH_TIME_IN_MS = 200;
// export const FLASH_TIME_IN_MS = 20000;

// export const FLASH_TIME_IN_MS = 20000;
// export const PREVIEW_TIME_IN_MS = 3000;
export const PREVIEW_TIME_IN_MS = 3000;

export const MAX_HEIGHT_TARGET_RM = 26;
export const MAX_HEIGHT_START_RM = 12;
export const COLUMN_GAP_TARGET_RM = 0.5;
export const COLUMN_GAP_START_RM = 0.5;

// export const ANIMATION_DURATION_MS = 2000;
export const ANIMATION_DURATION_MS = 2000;

// 2592x1944 4:3

export const YETIIZE_STATUSES = [
  "yetiizeReady",
  "yetiizeStart",
  "yetiizeFinish",
  "print",
];
