import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function MenuCard({ item }) {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="border p-3 rounded shadow">
      <h2 className="font-bold">{item.name}</h2>
      <p>₹{item.price}</p>

      <button
        onClick={() => addToCart(item)}
        className="bg-green-500 text-white px-3 py-1 mt-2"
      >
        Add to Cart
      </button>
    </div>
  );
}