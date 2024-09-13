import { useState, useEffect } from "react";
import PreviousCaptureContainer from "./PreviousCaptureContainer";

export default function PreviousCaptures({ imgs }: { imgs: Array<string> }) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<unknown | null>();

  const imgTags = imgs.map((src, index) => {
    // normally index's are bad keys but this won't be reordered

    return (
      <PreviousCaptureContainer
        key={index}
        src={src}
        index={index}
        setIsLoading={setIsLoading}
        setError={setError}
      />
    );
  });

  return <>{imgTags}</>;
}
