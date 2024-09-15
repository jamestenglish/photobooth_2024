// TODO JTE smaller max-h and change animation params
export default function PreviousCaptureContainer({ src }: { src: string }) {
  return (
    <div className="flex flex-col gap-6 items-center">
      <img
        className="preview-img object-scale-down max-h-48"
        src={src}
        style={{ border: "1px solid red" }}
      />
    </div>
  );
}
