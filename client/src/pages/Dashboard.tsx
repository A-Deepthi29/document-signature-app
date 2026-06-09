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

              {signature && (
                <div
                  style={{
                    position: "absolute",
                    left: signature.x,
                    top: signature.y,
                    background: "#374151",
                    color: "white",
                    padding: "5px",
                    border: "1px solid black",
                    fontWeight: "bold",
                  }}
                >
                  ✍️ Sign Here
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Dashboard;