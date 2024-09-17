import yeti1 from "~/images/yeti-1-big.png";
import yeti1b from "~/images/yeti-1-biggest.png";

import yeti2 from "~/images/yeti-2-big.png";
import yeti3 from "~/images/yeti-3-big.png";
import yeti4 from "~/images/yeti-4-big.png";

import yeti5 from "~/images/yeti-5-big.png";
import yeti6 from "~/images/yeti-6-big.png";
import yeti7 from "~/images/yeti-7-big.png";
import yeti8 from "~/images/yeti-8-big.png";
import yeti9 from "~/images/yeti-9-big.png";
import yeti10 from "~/images/yeti-10-big.png";
import yeti10b from "~/images/yeti-10-biggest.png";

import yeti11 from "~/images/yeti-cute-2-big.png";
import yeti11b from "~/images/yeti-cute-2-biggest.png";
import yeti12 from "~/images/yeti-cute-3-big.png";
import yeti12b from "~/images/yeti-cute-3-biggest.png";

import yeti13 from "~/images/yeti-cute-4-big.png";
import yeti13b from "~/images/yeti-cute-4-biggest.png";

import yeti14 from "~/images/yeti-roar-1-big.png";
import yeti14b from "~/images/yeti-roar-1-biggest.png";

import yeti15 from "~/images/yeti-roar-2-big.png";
import yeti15b from "~/images/yeti-roar-2-biggest.png";

import yeti16 from "~/images/yeti-silly-1-big.png";
import yeti16b from "~/images/yeti-silly-1-biggest.png";

import yeti17 from "~/images/yeti-silly-2-big.png";
import yeti17b from "~/images/yeti-silly-2-biggest.png";

import yeti18 from "~/images/yeti-tongue-1-big.png";
import yeti18b from "~/images/yeti-tongue-1-biggest.png";

import yeti19 from "~/images/yeti-tongue-2-big.png";
import yeti19b from "~/images/yeti-tongue-2-biggest.png";

import yeti20 from "~/images/yeti-roar-3-big.png";

import yeti21 from "~/images/yeti-3-bigger.png";
import yeti22 from "~/images/yeti-5-bigger.png";
import yeti23 from "~/images/yeti-6-biggest.png";
import yeti24 from "~/images/yeti-7-biggest.png";
import yeti25 from "~/images/yeti-8-biggest.png";
import yeti26 from "~/images/yeti-9-biggest.png";

export const MOCK_PRINT = true;
// export const MOCK_PRINT = false;

export const YETIS = [
  yeti1,
  yeti1b,

  yeti2,
  yeti20,

  yeti3,
  yeti21,

  yeti4,

  yeti5,
  yeti22,

  yeti6,
  yeti23,

  yeti7,
  yeti24,

  yeti8,
  yeti25,

  yeti9,
  yeti26,

  yeti10,
  yeti10b,

  yeti11,
  yeti11b,

  yeti12,
  yeti12b,
  yeti13,
  yeti13b,
  yeti14,
  yeti14b,
  yeti15,
  yeti15b,
  yeti16,
  yeti16b,

  yeti17,
  yeti17b,

  yeti18,
  yeti18b,
  yeti19,
  yeti19b,
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
export const PREVIEW_TIME_IN_MS = 500;

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
  "shuffleYetiBgIndex",
  "setOrigImg",
  "setBgImg",
  "print",
];
