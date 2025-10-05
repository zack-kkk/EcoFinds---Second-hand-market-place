import { useEffect, useState } from "react";
import API from "../api/axios";

export default function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    const res = await API.get("/cart");
    setCart(res.data?.products || []);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">My Cart</h2>
      {cart.map((p) => (
        <div key={p._id} className="border p-2 mb-2">
          <h3>{p.title}</h3>
          <p>${p.price}</p>
        </div>
      ))}
    </div>
  );
}
