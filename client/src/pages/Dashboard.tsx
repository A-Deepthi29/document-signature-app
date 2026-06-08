import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { useEffect, useState } from "react";
import axios from "axios";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

function Dashboard() {
  const [documents, setDocuments] = useState<any[]>([]);

  useEffect(() => {
    fetchDocuments();
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

  return (
  <div>
    <h1>Dashboard</h1>

    {documents.map((doc) => (
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

        {doc.filePath && (
  <Document
    file={
      "http://localhost:5000/" +
      doc.filePath.replace(/\\/g, "/")
    }
  >
    <Page
      pageNumber={1}
      width={250}
    />
  </Document>
)}
      </div>
    ))}
  </div>
);
}

export default Dashboard;