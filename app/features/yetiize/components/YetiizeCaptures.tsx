import YetiizeCaptureContainer from "./YetiizeCaptureContainer";
import { usePhotoboothImages } from "~/features/photobooth-state/components/PhotoboothStateProvider";

export default function YetiizeCaptures() {
  const { imgs, bgImgs } = usePhotoboothImages();

  const imgTags = imgs.map((src, index) => {
    const bgImgSrc = bgImgs[index];

    // normally index's are bad keys but this won't be reordered
    return (
      <YetiizeCaptureContainer
        key={index}
        src={src}
        index={index}
        bgImgSrc={bgImgSrc}
      />
    );
  });

  return <>{imgTags}</>;
}
