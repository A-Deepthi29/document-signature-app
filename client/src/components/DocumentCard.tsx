import type { DocumentType } from "../type/document";

interface Props {
  doc: DocumentType;
}

function DocumentCard({ doc }: Props) {
  return (
    <div className="bg-white rounded-xl shadow-md border p-5 hover:shadow-lg transition">
      <h3 className="text-lg font-bold text-gray-800 break-words">
        {doc.fileName}
      </h3>

      <p className="text-sm text-gray-500 mt-2 break-all">
        {doc.filePath}
      </p>

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
      </div>
    </div>
  );
}

export default DocumentCard;