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

export default function MyOrders() {

  const [orders, setOrders] =
    useState([]);

  const { user } =
    useContext(AuthContext);

  useEffect(() => {

    fetchOrders();

  }, []);

  const fetchOrders = async () => {

    try {

      const { data } =
        await API.get(
          "/orders/my-orders",
          {
            headers: {
              Authorization:
                `Bearer ${user.token}`,
            },
          }
        );

      setOrders(data);

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div className="min-h-screen bg-gray-100">

      <Navbar />

      <div className="max-w-5xl mx-auto p-8">

        <h1 className="text-4xl font-bold mb-8">

          My Orders

        </h1>

        {
          orders.length > 0 ? (

            <div className="space-y-6">

              {
                orders.map(order => (

                  <div
                    key={order._id}
                    className="bg-white p-6 rounded-lg shadow-lg"
                  >

                    <div className="flex justify-between items-center">

                      <div>

                        <h2 className="text-xl font-bold">

                          Order ID:
                          {" "}
                          {order._id}

                        </h2>

                        <p className="text-gray-600 mt-2">

                          Delivery:
                          {" "}
                          {order.deliveryType}

                        </p>

                      </div>

                      <div>

                        <span className="bg-orange-500 text-white px-4 py-2 rounded-full">

                          {order.orderStatus}

                        </span>

                      </div>

                    </div>

                    <div className="mt-6 space-y-4">

                      {
                        order.items.map(item => (

                          <div
                            key={item._id}
                            className="flex items-center gap-4 border-b pb-4"
                          >

                            <img
                              src={item.foodId?.image}
                              alt=""
                              className="w-24 h-24 rounded object-cover"
                            />

                            <div>

                              <h2 className="text-lg font-bold">

                                {item.foodId?.title}

                              </h2>

                              <p>

                                Qty:
                                {" "}
                                {item.quantity}

                              </p>

                              <p>

                                ₹
                                {item.foodId?.price}

                              </p>

                            </div>

                          </div>

                        ))
                      }

                    </div>

                    <div className="mt-6 text-right">

                      <h2 className="text-2xl font-bold">

                        Total:
                        {" "}
                        ₹{order.totalPrice}

                      </h2>

                    </div>

                  </div>

                ))
              }

            </div>

          ) : (

            <h2 className="text-xl">

              No Orders Found

            </h2>

          )
        }

      </div>

    </div>
  );
}