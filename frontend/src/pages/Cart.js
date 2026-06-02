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

export default function Cart() {

  const [cart, setCart] =
    useState(null);

  const [
    deliveryType,
    setDeliveryType
  ] = useState("self");

  const [
    paymentMethod,
    setPaymentMethod
  ] = useState("COD");

  const [deliveryAddress, setDeliveryAddress] = useState("");

  const [deliveryLat, setDeliveryLat] = useState("");

  const [deliveryLng, setDeliveryLng] = useState("");

  const { user } =
    useContext(AuthContext);

  useEffect(() => {

    fetchCart();

  }, []);

  // FETCH CART
  const fetchCart = async () => {

    try {

      const { data } =
        await API.get(
          "/cart",
          {
            headers: {
              Authorization:
                `Bearer ${user.token}`,
            },
          }
        );

      setCart(data);

    } catch (error) {

      console.log(error);

    }
  };

  // UPDATE QUANTITY
  const updateQuantity =
  async (
    foodId,
    quantity
  ) => {

    if (quantity < 1) return;

    try {

      await API.put(
        "/cart/update",
        {
          foodId,
          quantity,
        },
        {
          headers: {
            Authorization:
              `Bearer ${user.token}`,
          },
        }
      );

      fetchCart();

    } catch (error) {

      console.log(error);

    }

  };

  // REMOVE ITEM
  const removeItem =
  async (id) => {

    try {

      await API.delete(
        `/cart/${id}`,
        {
          headers: {
            Authorization:
              `Bearer ${user.token}`,
          },
        }
      );

      fetchCart();

    } catch (error) {

      console.log(error);

    }
  };

  // TOTAL
  const total =
    cart?.items?.reduce(
      (acc, item) =>

        acc +
        item.foodId.price *
        item.quantity,

      0
    ) || 0;

  const finalTotal =
    deliveryType === "delivery"
      ? total + 40
      : total;

  // PLACE ORDER
  const placeOrder =
  async () => {

    if (deliveryType === "delivery" && !deliveryAddress.trim()) {
      return alert("Please enter delivery address");
    }

    try {

      let paymentStatus =
        "Pending";

      if (
        paymentMethod !== "COD"
      ) {

        const confirmPayment =
          window.confirm(
            "Fake Payment Successful?"
          );

        if (!confirmPayment) {

          return alert(
            "Payment Failed"
          );

        }

        paymentStatus =
          "Paid";
      }

      await API.post(
        "/orders/place",
        {

          deliveryType,

          paymentMethod,

          paymentStatus,

          deliveryAddress: deliveryType === "delivery" ? deliveryAddress : "",

          deliveryLat: deliveryType === "delivery" ? deliveryLat : "",

          deliveryLng: deliveryType === "delivery" ? deliveryLng : "",

        },
        {
          headers: {
            Authorization:
              `Bearer ${user.token}`,
          },
        }
      );

      alert(
        "Order Placed Successfully"
      );

      fetchCart();

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
        max-w-4xl
        mx-auto
        p-8
      ">

        <h1 className="
          text-3xl
          font-bold
          mb-6
        ">
          My Cart
        </h1>

        {
          cart?.items?.length > 0
          ? (

            <>

              {
                cart.items.map(item => (

                  <div
                    key={item._id}
                    className="
                      bg-white
                      p-4
                      rounded-lg
                      shadow
                      mb-4
                      flex
                      justify-between
                      items-center
                    "
                  >

                    <div className="
                      flex
                      items-center
                      gap-4
                    ">

                      <img
                        src={`http://localhost:5000/${item.foodId.image}`}
                        alt=""
                        className="
                          w-24
                          h-24
                          rounded
                          object-cover
                        "
                      />

                      <div>

                        <h2 className="
                          text-xl
                          font-bold
                        ">
                          {
                            item.foodId.title
                          }
                        </h2>

                        <p>
                          ₹{
                            item.foodId.price
                          }
                        </p>

                        <div className="
                          flex
                          items-center
                          gap-3
                          mt-2
                        ">

                          <button
                            onClick={()=>
                              updateQuantity(
                                item.foodId._id,
                                item.quantity - 1
                              )
                            }
                            className="
                              bg-gray-300
                              px-3
                              py-1
                              rounded
                            "
                          >
                            -
                          </button>

                          <span className="
                            font-bold
                            text-lg
                          ">
                            {item.quantity}
                          </span>

                          <button
                            onClick={()=>
                              updateQuantity(
                                item.foodId._id,
                                item.quantity + 1
                              )
                            }
                            className="
                              bg-gray-300
                              px-3
                              py-1
                              rounded
                            "
                          >
                            +
                          </button>

                        </div>

                      </div>

                    </div>

                    <button
                      onClick={()=>
                        removeItem(
                          item.foodId._id
                        )
                      }
                      className="
                        bg-red-500
                        text-white
                        px-4
                        py-2
                        rounded
                      "
                    >

                      Remove

                    </button>

                  </div>

                ))
              }

              {/* DELIVERY */}

              <div className="
                bg-white
                p-6
                rounded-lg
                shadow
                mt-6
              ">

                <h2 className="
                  text-2xl
                  font-bold
                  mb-4
                ">
                  Delivery Type
                </h2>

                <select
                  className="
                    border
                    p-3
                    rounded
                    w-full
                  "
                  value={
                    deliveryType
                  }
                  onChange={(e)=>
                    setDeliveryType(
                      e.target.value
                    )
                  }
                >

                  <option value="self">
                    Self Pickup
                  </option>

                  <option value="delivery">
                    Home Delivery (+40)
                  </option>

                </select>

              </div>

              {/* DELIVERY ADDRESS - Only show when delivery is selected */}
              {deliveryType === "delivery" && (
                <div className="
                  bg-white
                  p-6
                  rounded-lg
                  shadow
                  mt-6
                ">

                  <h2 className="
                    text-2xl
                    font-bold
                    mb-4
                  ">
                    Delivery Address
                  </h2>

                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">
                      Full Address
                    </label>
                    <textarea
                      className="
                        border
                        p-3
                        rounded
                        w-full
                        h-24
                        resize-none
                      "
                      placeholder="Enter your complete delivery address..."
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Latitude (Optional)
                      </label>
                      <input
                        type="number"
                        step="any"
                        className="border p-3 rounded w-full"
                        placeholder="28.6139"
                        value={deliveryLat}
                        onChange={(e) => setDeliveryLat(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Longitude (Optional)
                      </label>
                      <input
                        type="number"
                        step="any"
                        className="border p-3 rounded w-full"
                        placeholder="77.2090"
                        value={deliveryLng}
                        onChange={(e) => setDeliveryLng(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Map Preview */}
                  {(deliveryLat && deliveryLng) && (
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold mb-2">Location Preview</h3>
                      <div className="h-64 rounded-lg overflow-hidden border">
                        <iframe
                          width="100%"
                          height="100%"
                          frameBorder="0"
                          scrolling="no"
                          marginHeight="0"
                          marginWidth="0"
                          src={`https://www.openstreetmap.org/export/embed.html?bbox=${parseFloat(deliveryLng)-0.01}%2C${parseFloat(deliveryLat)-0.01}%2C${parseFloat(deliveryLng)+0.01}%2C${parseFloat(deliveryLat)+0.01}&layer=mapnik&marker=${deliveryLat}%2C${deliveryLng}`}
                          style={{ border: '1px solid black' }}
                        ></iframe>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">
                        Tip: You can get coordinates from Google Maps by right-clicking on your location
                      </p>
                    </div>
                  )}

                </div>
              )}

              {/* PAYMENT */}

              <div className="
                bg-white
                p-6
                rounded-lg
                shadow
                mt-6
              ">

                <h2 className="
                  text-2xl
                  font-bold
                  mb-4
                ">
                  Payment Method
                </h2>

                <select
                  className="
                    border
                    p-3
                    rounded
                    w-full
                  "
                  value={
                    paymentMethod
                  }
                  onChange={(e)=>
                    setPaymentMethod(
                      e.target.value
                    )
                  }
                >

                  <option value="COD">
                    Cash On Delivery
                  </option>

                  <option value="UPI">
                    Dummy UPI
                  </option>

                  <option value="CARD">
                    Dummy Card
                  </option>

                </select>

              </div>

              {/* TOTAL */}

              <div className="
                bg-white
                p-6
                rounded-lg
                shadow
                mt-6
              ">

                <p className="
                  text-lg
                ">
                  Food Total:
                  {" "}
                  ₹{total}
                </p>

                <p className="
                  text-lg
                ">
                  Delivery:
                  {" "}
                  ₹{
                    deliveryType ===
                    "delivery"
                      ? 40
                      : 0
                  }
                </p>

                <h2 className="
                  text-3xl
                  font-bold
                  mt-4
                ">
                  Total:
                  {" "}
                  ₹{finalTotal}
                </h2>

                <button
                  onClick={placeOrder}
                  className="
                    mt-6
                    w-full
                    bg-orange-500
                    text-white
                    py-3
                    rounded
                    text-lg
                  "
                >

                  Place Order

                </button>

              </div>

            </>

          ) : (

            <h2 className="
              text-xl
            ">
              Cart Empty
            </h2>

          )
        }

      </div>

    </div>
  );
}