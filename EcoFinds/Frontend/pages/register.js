import { useState } from "react";
import API from "../api-axios";

export default function Register() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post("/auth/register", form);
    alert("Registered successfully, please login");
    window.location.href = "/login";
  };

  return (
    <form className="max-w-md mx-auto space-y-3" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold">Register</h2>
      <input name="username" placeholder="Username" onChange={handleChange} className="border p-2 w-full" />
      <input name="email" type="email" placeholder="Email" onChange={handleChange} className="border p-2 w-full" />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} className="border p-2 w-full" />
      <button className="bg-blue-600 text-white p-2 w-full">Register</button>
    </form>
  );
}
