import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center gap-4">

      <h1 className="text-5xl font-bold">
        Document Signature App
      </h1>

      <button
        onClick={() => navigate("/login")}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Login
      </button>

      <button
        onClick={() => navigate("/register")}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Register
      </button>

    </div>
  );
}

export default Home;