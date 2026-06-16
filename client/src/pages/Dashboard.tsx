import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import DocumentCard from "../components/DocumentCard";
import type { DocumentType } from "../type/document";

function Dashboard() {
  const navigate = useNavigate();
  const [documents, setDocuments] =
    useState<DocumentType[]>([]);

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
  className="
    bg-blue-600
    text-white
    px-4
    py-2
    rounded-lg
    hover:bg-blue-700
  "
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
      />
    ))
  )}
</div>
    </div>
  );
}

export default Dashboard;