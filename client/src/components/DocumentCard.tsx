import type { DocumentType } from "../type/document";

interface Props {
  doc: DocumentType;

  createSignature: (
    fileId: string,
    x: number,
    y: number
  ) => void;

  setSelectedDoc: (
    doc: DocumentType
  ) => void;

  position: {
    x: number;
    y: number;
  };
}

function DocumentCard({
  doc,
  createSignature,
  setSelectedDoc,
  position,
}: Props) {
  return (
    <div className="bg-white rounded-xl shadow-md border p-5 hover:shadow-lg transition">

      <h3 className="text-lg font-bold text-gray-800 break-words">
        {doc.fileName}
      </h3>

      <div className="flex flex-col gap-3 mt-4">

        <button
          onClick={() =>
            setSelectedDoc(doc)
          }
          className="
            bg-blue-500
            text-white
            px-4
            py-2
            rounded
          "
        >
          Preview PDF
        </button>

        <button
          onClick={() =>
            createSignature(
              doc._id,
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
          "
        >
          Create Signature Request
        </button>

      </div>

      <div className="mt-4">

        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            doc.status === "Signed"
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {doc.status || "Pending"}
        </span>

        {doc.status === "Signed" && (
          <button
            onClick={() =>
              window.open(
                `http://localhost:5000/api/docs/download/${doc._id}`
              )
            }
            className="
              bg-blue-500
              text-white
              px-3
              py-2
              rounded
              mt-3
              block
            "
          >
            Download Signed PDF
          </button>
        )}

      </div>
    </div>
  );
}

export default DocumentCard;