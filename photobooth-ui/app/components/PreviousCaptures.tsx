export default function PreviousCaptures({ imgs }: { imgs: Array<string> }) {
  const imgTags = imgs.map((src, index) => {
    // normally index's are bad keys but this won't be reordered
    return <img src={src} key={index} height={30} width={30} />;
  });

  console.log({ length: imgs.length, imgTags });
  return <>{imgTags}</>;
}
