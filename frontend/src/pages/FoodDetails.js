import {
  useEffect,
  useState,
  useContext,
} from "react";

import {
  useParams,
  useNavigate,
} from "react-router-dom";

import API from "../services/api";

import Navbar from "../components/Navbar";

import {
  AuthContext,
} from "../context/AuthContext";

export default function FoodDetails() {

  const { id } =
    useParams();

  const navigate =
    useNavigate();

  const { user } =
    useContext(AuthContext);

  const [food, setFood] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    fetchFood();

  }, []);

  // FETCH SINGLE FOOD
  const fetchFood =
  async () => {

    try {

      const { data } =
        await API.get(
          `/foods/${id}`
        );

      setFood(data);

      setLoading(false);

    } catch (error) {

      console.log(error);

      setLoading(false);

    }
  };

  // ADD TO CART
  const addToCart =
  async () => {

    if (!user) {

      return alert(
        "Login First"
      );

    }

    try {

      await API.post(
        "/cart/add",
        {
          foodId:
            food._id,

          quantity: 1,
        },
        {
          headers: {
            Authorization:
              `Bearer ${user.token}`,
          },
        }
      );

      alert(
        "Added To Cart"
      );

      navigate("/cart");

    } catch (error) {

      console.log(error);

    }
  };

  if (loading) {

    return (

      <div className="
        min-h-screen
        flex
        items-center
        justify-center
      ">

        <h1 className="
          text-3xl
          font-bold
        ">
          Loading...
        </h1>

      </div>
    );
  }

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

        <div className="
          bg-white
          rounded-2xl
          shadow-lg
          overflow-hidden
          grid
          md:grid-cols-2
          gap-8
        ">

          {/* IMAGE */}

          <div>

            <img
              src={`http://localhost:5000/${food.image}`}
              alt=""
              className="
                w-full
                h-full
                object-cover
              "
            />

          </div>

          {/* DETAILS */}

          <div className="
            p-6
          ">

            <h1 className="
              text-4xl
              font-bold
              mb-4
            ">
              {food.title}
            </h1>

            <p className="
              text-gray-600
              text-lg
              mb-6
            ">
              {food.description}
            </p>

            <div className="
              space-y-4
            ">

              <h2 className="
                text-3xl
                font-bold
                text-orange-500
              ">
                ₹{food.price}
              </h2>

              <p className="
                text-lg
              ">
                Category:
                {" "}
                <span className="
                  font-bold
                ">
                  {food.category}
                </span>
              </p>

              <p className="
                text-lg
              ">
                Seller:
                {" "}
                <span className="
                  font-bold
                ">
                  {food.sellerId?.name}
                </span>
              </p>

            </div>

            {/* BUTTONS */}

            <div className="
                   grid
                   md:grid-cols-3
                       gap-4
                          mt-8
                            ">
              <button
                onClick={addToCart}
                className="
                  w-full
                  bg-orange-500
                  text-white
                  py-4
                  rounded-lg
                  text-lg
                  font-bold
                "
              >
                Add To Cart
              </button>

              <button
                onClick={()=>
                  navigate("/cart")
                }
                className="
                  w-full
                  bg-black
                  text-white
                  py-4
                  rounded-lg
                  text-lg
                  font-bold
                "
              >
                Buy Now
              </button>

              <button
                onClick={()=>
                  navigate(
                    `/chat/${food._id}`
                  )
                }
                className="
                  w-full
                  bg-green-500
                  text-white
                  py-4
                  rounded-lg
                  text-lg
                  font-bold
                "
              >
                Chat With Seller
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}