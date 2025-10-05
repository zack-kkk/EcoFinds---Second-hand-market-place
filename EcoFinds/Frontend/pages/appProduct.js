import { useState } from "react";
import API from "../api/axios";

export default function AddProduct() {
  const [form, setForm] = useState({ title: "", description: "", category: "", price: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post("/products", form);
    alert("Product added");
    window.location.href = "/";
  };

  return (
    <form className="max-w-md mx-auto space-y-3" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold">Add Product</h2>
      <input name="title" placeholder="Title" onChange={handleChange} className="border p-2 w-full" />
      <input name="category" placeholder="Category" onChange={handleChange} className="border p-2 w-full" />
      <textarea name="description" placeholder="Description" onChange={handleChange} className="border p-2 w-full" />
      <input name="price" type="number" placeholder="Price" onChange={handleChange} className="border p-2 w-full" />
      <button className="bg-blue-600 text-white p-2 w-full">Submit</button>
    </form>
  );
}
