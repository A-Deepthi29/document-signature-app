import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function PublicSign() {
  const { token } = useParams();

  const [signature, setSignature] =
    useState<any>(null);

  useEffect(() => {
    fetchSignature();
  }, []);

  const fetchSignature = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/public/sign/${token}`
      );

      setSignature(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const signDocument = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/public/sign/${token}`,
        {
          status: "signed",
        }
      );

      alert("Document Signed");

      fetchSignature();
    } catch (error) {
      console.log(error);
    }
  };

  const rejectDocument = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/public/sign/${token}`,
        {
          status: "rejected",
          rejectionReason:
            "Rejected by signer",
        }
      );

      alert("Document Rejected");

      fetchSignature();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center gap-4">

      <h1 className="text-3xl font-bold">
        Document Signature Request
      </h1>

      <p>
        Signer:
        {signature?.signer}
      </p>

      <p>
        Status:
        {signature?.status}
      </p>

      <div className="flex gap-4">

        <button
          onClick={signDocument}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Sign
        </button>

        <button
          onClick={rejectDocument}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Reject
        </button>

      </div>

    </div>
  );
}

export default PublicSign;