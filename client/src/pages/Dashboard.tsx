import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { useEffect, useState } from "react";
import axios from "axios";

pdfjs.GlobalWorkerOptions.workerSrc =
  `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

function Dashboard() {
  const [documents, setDocuments] = useState<any[]>([]);
  const [signatures, setSignatures] = useState<any[]>([]);
  const [position, setPosition] = useState({
    x: 120,
    y: 300,
  });

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
      console.log("Documents Error:", error);
    }
  };

  const fetchSignatures = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/signatures"
      );

      setSignatures(response.data);
    } catch (error) {
      console.log("Signatures Error:", error);
    }
  };

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
          status: "pending",
        }
      );

      alert("Signature Saved Successfully");

      fetchSignatures();
    } catch (error) {
      console.log(error);
      alert("Failed to save signature");
    }
  };

  return (
    <div>
      <h1>Dashboard</h1>

      {documents.map((doc) => {
        if (!doc.filePath) {
  return null;
}

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
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                />
              </Document>

              {/* Signature Placeholder */}
              <div
                style={{
                  position: "absolute",
                  left: signature?.x || position.x,
                  top: signature?.y || position.y,
                  background: "#2196F3",
                  color: "white",
                  padding: "10px",
                  borderRadius: "5px",
                  fontWeight: "bold",
                }}
              >
                ✍️ Sign Here
              </div>
            </div>

            <br />

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