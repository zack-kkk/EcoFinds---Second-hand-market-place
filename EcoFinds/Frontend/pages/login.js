import { useState } from "react";
import API from "../api/axios";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await API.post("/auth/login", form);
    localStorage.setItem("token", res.data.token);
    window.location.href = "/";
  };

  return (
    <form className="max-w-md mx-auto space-y-3" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold">Login</h2>
      <input name="email" type="email" placeholder="Email" onChange={handleChange} className="border p-2 w-full" />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} className="border p-2 w-full" />
      <button className="bg-blue-600 text-white p-2 w-full">Login</button>
    </form>
  );
}
