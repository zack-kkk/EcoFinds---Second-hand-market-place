import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await API.get("/products");
    setProducts(res.data);
  };

  const handleSearch = async () => {
    const res = await API.get(`/products?keyword=${search}`);
    setProducts(res.data);
  };

  return (
    <div>
      <div className="flex space-x-2 mb-4">
        <input
          placeholder="Search..."
          className="border p-2 flex-1"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={handleSearch} className="bg-blue-600 text-white p-2">Search</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map((p) => (
          <Link key={p._id} to={`/product/${p._id}`} className="border p-2 rounded shadow">
            <img src={p.image} alt={p.title} className="h-40 w-full object-cover" />
            <h3 className="font-bold">{p.title}</h3>
            <p>${p.price}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
