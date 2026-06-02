import {
  useEffect,
  useState,
  useContext,
} from "react";

import API from "../services/api";

import Navbar from "../components/Navbar";

import {
  AuthContext,
} from "../context/AuthContext";

export default function Wishlist() {

  const { user } =
    useContext(AuthContext);

  const [items, setItems] =
    useState([]);

  useEffect(() => {

    fetchWishlist();

  }, []);

  const fetchWishlist =
  async () => {

    try {

      const { data } =
        await API.get(
          "/wishlist",
          {
            headers: {
              Authorization:
                `Bearer ${user.token}`,
            },
          }
        );

      setItems(data);

    } catch (error) {

      console.log(error);

    }
  };

  return (

    <div className="
      min-h-screen
      bg-gray-100
    ">

      <Navbar />

      <div className="
        max-w-6xl
        mx-auto
        p-8
      ">

        <h1 className="
          text-4xl
          font-bold
          mb-8
        ">
          My Wishlist ❤️
        </h1>

        <div className="
          grid
          md:grid-cols-3
          gap-6
        ">

          {
            items.map(item => (

              <div
                key={item._id}
                className="
                  bg-white
                  rounded-lg
                  shadow-lg
                  overflow-hidden
                "
              >

                <img
                  src={`http://localhost:5000/${item.foodId.image}`}
                  alt=""
                  className="
                    h-52
                    w-full
                    object-cover
                  "
                />

                <div className="p-4">

                  <h2 className="
                    text-xl
                    font-bold
                  ">
                    {
                      item.foodId.title
                    }
                  </h2>

                  <p className="
                    text-gray-500
                  ">
                    {
                      item.foodId.category
                    }
                  </p>

                  <h2 className="
                    text-2xl
                    font-bold
                    text-orange-500
                    mt-3
                  ">
                    ₹{
                      item.foodId.price
                    }
                  </h2>

                </div>

              </div>

            ))
          }

        </div>

      </div>

    </div>
  );
}