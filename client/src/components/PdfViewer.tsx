import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc =
  `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface Props {
  pdfUrl: string;
  position: {
    x: number;
    y: number;
  };
  setPosition: any;
}

function PdfViewer({
  pdfUrl,
  position,
  setPosition,
}: Props) {

  const handleClick = (
    e: React.MouseEvent<HTMLDivElement>
  ) => {

    const rect =
      e.currentTarget.getBoundingClientRect();

    const x =
      e.clientX - rect.left;

    const y =
      e.clientY - rect.top;

    console.log("X:", x);
    console.log("Y:", y);

    setPosition({
      x,
      y,
    });
  };

  return (
    <div
      style={{
        position: "relative",
        display: "inline-block",
      }}
      onClick={handleClick}
    >

      <Document
  file={pdfUrl}
  onLoadSuccess={() =>
    console.log("PDF Loaded Successfully")
  }
  onLoadError={(error) =>
    console.log("PDF ERROR:", error)
  }
>
  <Page
    pageNumber={1}
    width={500}
  />
</Document>

      {position.x > 0 && (
        <div
          style={{
            position: "absolute",
            left: position.x,
            top: position.y,
            background: "blue",
            color: "white",
            padding: "5px",
          }}
        >
          Sign Here
        </div>
      )}

    </div>
  );
}

export default PdfViewer;