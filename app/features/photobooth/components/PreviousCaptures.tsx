import PreviousCaptureContainer from "./PreviousCaptureContainer";
import { usePhotoboothImages } from "~/features/photobooth-state/components/PhotoboothStateProvider";

export default function PreviousCaptures() {
  const { imgs } = usePhotoboothImages();

  const imgTags = imgs.map((src, index) => {
    // normally index's are bad keys but this won't be reordered
    return <PreviousCaptureContainer key={index} src={src} />;
  });

  return <>{imgTags}</>;
}
