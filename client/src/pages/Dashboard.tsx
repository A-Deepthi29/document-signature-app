import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import DocumentCard from "../components/DocumentCard";
import type { DocumentType } from "../type/document";
import PdfViewer from "../components/PdfViewer";

function Dashboard() {
  const navigate = useNavigate();
  const [selectedDoc, setSelectedDoc] =
  useState<DocumentType | null>(null);
  const [documents, setDocuments] =
    useState<DocumentType[]>([]);

const [position, setPosition] =
  useState({
    x: 0,
    y: 0,
  });

  const [filter, setFilter] =
    useState("All");

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
  try {
    const token = localStorage.getItem("token");

    console.log("TOKEN:", token);

    const response = await axios.get(
  `${import.meta.env.VITE_API_URL}/api/docs`,
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
const createSignature = async (
  fileId: string,
  x: number,
  y: number
) => {

  if (x === 0 && y === 0) {
    alert(
      "Please open the PDF and click where the signature should be placed."
    );
    return;
  }

  try {

    const response =
      await axios.post(
  `${import.meta.env.VITE_API_URL}/api/signatures`,
        {
          fileId,
          signer: "Deepthi",
          x,
          y,
        }
      );

      console.log(
  "SIGN LINK:",
  response.data.publicLink
);

alert(
  `Signature Link:\n${response.data.publicLink}`
);

    alert(
      "Signature Request Created Successfully"
    );

    console.log(response.data);

  } catch (error) {
    console.log(error);
  }
};
  const filteredDocs =
    filter === "All"
      ? documents
      : documents.filter(
          (doc) =>
            doc.status === filter
        );

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">

        <h1 className="text-3xl font-bold">
          My Documents
        </h1>

<button
  onClick={() => navigate("/upload")}
  className="bg-blue-500 text-white px-4 py-2 rounded"
>
  Upload New
</button>

      </div>

      {/* Filter */}
      <div className="mb-6">

        <select
          value={filter}
          onChange={(e) =>
            setFilter(
              e.target.value
            )
          }
          className="
            border
            rounded-lg
            px-4
            py-2
            bg-white
          "
        >
          <option value="All">
            All Documents
          </option>

          <option value="Pending">
            Pending
          </option>

          <option value="Signed">
            Signed
          </option>

        </select>

      </div>

      {/* Responsive Grid */}
      <div
  className="
    grid
    grid-cols-1
    sm:grid-cols-2
    lg:grid-cols-3
    gap-6
  "
>
  
  {filteredDocs.length === 0 ? (
    <div className="col-span-full text-center text-gray-500 text-lg">
      No documents found
    </div>
  ) : (
    filteredDocs.map((doc) => (
  <DocumentCard
  key={doc._id}
  doc={doc}
  createSignature={createSignature}
  setSelectedDoc={setSelectedDoc}
  position={position}
/>
))
  )}
</div>
{selectedDoc && (
  <div
    className="
      fixed
      inset-0
      bg-black/50
      flex
      justify-center
      items-center
      z-50
    "
  >
    <div
      className="
        bg-white
        p-5
        rounded-xl
        w-[90%]
        h-[90vh]
        overflow-auto
      "
    >
      <div className="flex justify-between mb-4">

        <h2 className="text-xl font-bold">
          {selectedDoc.fileName}
        </h2>

        <button
          onClick={() =>
            setSelectedDoc(null)
          }
          className="
            bg-red-500
            text-white
            px-3
            py-1
            rounded
          "
        >
          Close
        </button>

      </div>
          console.log("Selected Document:", selectedDoc);
console.log("FILE PATH:", selectedDoc?.filePath);
      <PdfViewer
  pdfUrl={`${import.meta.env.VITE_API_URL}/${selectedDoc.filePath.replace(
    /\\/g,
    "/"
  )}`}
  position={position}
  setPosition={setPosition}
/>

      <div className="mt-4">

        <p>
          X: {position.x}
        </p>

        <p>
          Y: {position.y}
        </p>

        <button
          onClick={() =>
            createSignature(
              selectedDoc._id,
              position.x,
              position.y
            )
          }
          className="
            bg-green-500
            text-white
            px-4
            py-2
            rounded
            mt-3
          "
        >
          Save Signature Position
        </button>

      </div>

    </div>
  </div>
)}
    </div>
  );
}

export default Dashboard;