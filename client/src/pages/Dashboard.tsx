import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Rnd } from "react-rnd";

pdfjs.GlobalWorkerOptions.workerSrc =
  `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

function Dashboard() {
  const [documents, setDocuments] = useState<any[]>([]);
  const [signatures, setSignatures] = useState<any[]>([]);

  useEffect(() => {
    fetchDocuments();
    fetchSignatures();
  }, []);

  const fetchDocuments = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:5000/api/docs",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setDocuments(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSignatures = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/signatures"
      );

      setSignatures(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const [position, setPosition] = useState({
  x: 120,
  y: 300,
});

const saveSignature = async (
  fileId: string,
  x: number,
  y: number
) => {
  try {
    await axios.post(
      "http://localhost:5000/api/signatures",
      {
        fileId,
        signer: "Deepthi",
        x,
        y,
      }
    );

    alert("Signature Saved");
  } catch (error) {
    console.log(error);
  }
};

  return (
    <div>
      <h1>Dashboard</h1>

      {documents.map((doc) => {
        if (!doc.filePath) return null;

        const pdfUrl =
          "http://localhost:5000/" +
          doc.filePath.replace(/\\/g, "/");

        const signature = signatures.find(
          (sig) => sig.fileId === doc._id
        );

        return (
          <div
            key={doc._id}
            style={{
              border: "1px solid gray",
              margin: "20px",
              padding: "10px",
            }}
          >
            <h3>{doc.fileName}</h3>

            <p>{doc.filePath}</p>

            <div
              style={{
                position: "relative",
                display: "inline-block",
              }}
            >
              <Document file={pdfUrl}>
                <Page
                  pageNumber={1}
                  width={300}
                />
              </Document>

              <Rnd
  default={{
    x: position.x,
    y: position.y,
    width: 120,
    height: 40,
  }}
  onDragStop={(e, d) => {
    setPosition({
      x: d.x,
      y: d.y,
    });

    console.log(
      "X:",
      d.x,
      "Y:",
      d.y
    );
  }}
  enableResizing={false}
>
  <div
    style={{
      background: "#2196F3",
      color: "white",
      padding: "8px",
      borderRadius: "5px",
      fontWeight: "bold",
      cursor: "move",
      textAlign: "center",
    }}
  >
    ✍️ Sign Here
  </div>
</Rnd>
            </div>
            <button
  onClick={() =>
    saveSignature(
      doc._id,
      position.x,
      position.y
    )
  }
>
  Save Position
</button>
          </div>
        );
      })}
    </div>
  );
}

export default Dashboard;