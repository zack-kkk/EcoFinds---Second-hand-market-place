import { Link } from "react-router-dom";

export default function Navbar() {
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <nav className="bg-blue-600 p-4 text-white flex justify-between">
      <Link to="/" className="font-bold">EcoFinds</Link>
      <div className="space-x-4">
        {token ? (
          <>
            <Link to="/add">Add Product</Link>
            <Link to="/mylistings">My Listings</Link>
            <Link to="/cart">Cart</Link>
            <Link to="/purchases">Purchases</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
