export default function FoodCard({ food }) {
  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition p-3">
      
      <img
        src={food.image || "https://via.placeholder.com/300"}
        alt=""
        className="w-full h-40 object-cover rounded-lg"
      />

      <div className="mt-2">
        <h2 className="font-semibold text-lg">{food.title}</h2>
        
        <div className="flex justify-between items-center">
          <p className="text-gray-600">₹{food.price}</p>
          <span className="bg-green-500 text-white px-2 py-0.5 rounded text-sm">
            ⭐ 4.2
          </span>
        </div>

        <p className="text-sm text-gray-500">
          {food.sellerId?.name || "Home Chef"}
        </p>

        <button className="mt-2 w-full bg-red-500 text-white py-1 rounded">
          Order Now
        </button>
      </div>
    </div>
  );
}