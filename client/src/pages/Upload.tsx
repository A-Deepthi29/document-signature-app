import { useState } from "react";
import axios from "axios";

function Upload() {
  const [file, setFile] = useState<File | null>(null);

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a PDF");
      return;
    }

    const formData = new FormData();
    formData.append("pdf", file);

    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/docs/upload",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("PDF Uploaded Successfully");
      console.log(response.data);
    } catch (error) {
      console.log(error);
      alert("Upload Failed");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">

      <h1 className="text-3xl font-bold">
        Upload PDF
      </h1>

     <input
  type="file"
  accept=".pdf"
  onChange={(e) => {
    if (e.target.files) {
      console.log("Selected File:", e.target.files[0]);
      setFile(e.target.files[0]);
    }
  }}
/>

      <button
        onClick={handleUpload}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Upload PDF
      </button>

    </div>
  );
}

export default Upload;