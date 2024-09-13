import { useSpring, easings } from "@react-spring/web";
import { useCallback, useRef } from "react";
import {
  MAX_HEIGHT_START_RM,
  MAX_HEIGHT_TARGET_RM,
  COLUMN_GAP_START_RM,
  COLUMN_GAP_TARGET_RM,
  ANIMATION_DURATION_MS,
} from "~/constants";

export default function useAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);

  const previousCapturesContainerRef = useRef<HTMLDivElement>(null);

  const [_props, api] = useSpring(() => ({
    config: {
      easing: easings.easeInCubic,
      duration: ANIMATION_DURATION_MS,
    },
    from: {
      scrollY: 0,
      maxHeight: MAX_HEIGHT_START_RM,
      columnGap: COLUMN_GAP_START_RM,
    },
    onChange: (result, spring, item) => {
      containerRef?.current?.scroll(0, result.value.scrollY);
      if (
        previousCapturesContainerRef?.current?.style.columnGap !== undefined
      ) {
        previousCapturesContainerRef.current.style.columnGap = `${result.value.columnGap}rem`;

        const imgs = Array.from(
          previousCapturesContainerRef.current.getElementsByClassName(
            "preview-img"
          )
        );
        imgs.forEach((el) => {
          const img = el as HTMLImageElement;
          img.style.maxHeight = `${result.value.maxHeight}rem`;
        });
      }
    },
  }));

  const startAnimation = useCallback(() => {
    const top =
      previousCapturesContainerRef?.current?.getBoundingClientRect()?.top ?? 0;
    api.start({
      to: {
        scrollY: top,
        columnGap: COLUMN_GAP_TARGET_RM,
        maxHeight: MAX_HEIGHT_TARGET_RM,
      },
    });
  }, [api]);

  return { containerRef, previousCapturesContainerRef, startAnimation };
}
