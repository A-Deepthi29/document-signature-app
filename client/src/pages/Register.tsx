import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {console.log(
  "API URL:",
  import.meta.env.VITE_API_URL
);
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/register`,
        {
          name,
          email,
          password,
        }
      );

      alert("Registration Successful");

      navigate("/login");
    } catch (error: any) {

  console.log("FULL ERROR:", error);

  console.log(
    "STATUS:",
    error.response?.status
  );

  console.log(
    "DATA:",
    error.response?.data
  );

  alert(
    JSON.stringify(
      error.response?.data
    )
  );
}
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center gap-4">

      <h1 className="text-3xl font-bold">
        Register
      </h1>

      <input
        type="text"
        placeholder="Enter Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 rounded w-72"
      />

      <input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 rounded w-72"
      />

      <input
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 rounded w-72"
      />

      <button
        onClick={handleRegister}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Register
      </button>

    </div>
  );
}

export default Register;