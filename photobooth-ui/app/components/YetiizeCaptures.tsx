import YetiizeCaptureContainer from "./YetiizeCaptureContainer";
import { usePhotoboothImages } from "./PhotoboothStateProvider";

export default function YetiizeCaptures() {
  const { imgs, bgImgs } = usePhotoboothImages();

  const imgTags = imgs.map((src, index) => {
    const bgImg = bgImgs[index];
    // normally index's are bad keys but this won't be reordered

    return (
      <YetiizeCaptureContainer
        key={index}
        src={src}
        index={index}
        bgImg={bgImg}
      />
    );
  });

  return <>{imgTags}</>;
}
