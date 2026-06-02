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

export default function Orders() {

  const [orders, setOrders] =
    useState([]);

  const { user } =
    useContext(AuthContext);

  useEffect(() => {

    fetchOrders();

  }, []);

  // FETCH ORDERS
  const fetchOrders =
  async () => {

    try {

      const { data } =
        await API.get(
          "/orders/my",
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

    <div className="
      min-h-screen
      bg-gray-100
    ">

      <Navbar />

      <div className="
        max-w-5xl
        mx-auto
        p-8
      ">

        <h1 className="
          text-4xl
          font-bold
          mb-8
        ">
          My Orders
        </h1>

        {
          orders.length > 0
          ? (

            <div className="
              space-y-6
            ">

              {
                orders.map(order => (

                  <div
                    key={order._id}
                    className="
                      bg-white
                      p-6
                      rounded-lg
                      shadow-lg
                    "
                  >

                    <div className="
                      flex
                      justify-between
                      items-center
                      mb-4
                    ">

                      <div>

                        <h2 className="
                          text-2xl
                          font-bold
                        ">
                          Order
                        </h2>

                        <p className="
                          text-gray-500
                        ">
                          ID:
                          {" "}
                          {order._id}
                        </p>

                      </div>

                      <span className="
                        bg-orange-500
                        text-white
                        px-4
                        py-2
                        rounded-full
                      ">
                        {
                          order.orderStatus
                        }
                      </span>

                    </div>

                    {/* ITEMS */}

                    <div className="
                      space-y-4
                    ">

                      {
                        order.items.map(item => (

                          <div
                            key={item._id}
                            className="
                              flex
                              items-center
                              gap-4
                              border-b
                              pb-4
                            "
                          >

                            <img
                              src={`http://localhost:5000/${item.foodId?.image}`}
                              alt=""
                              className="
                                w-20
                                h-20
                                rounded
                                object-cover
                              "
                            />

                            <div>

                              <h2 className="
                                text-lg
                                font-bold
                              ">
                                {
                                  item.foodId?.title
                                }
                              </h2>

                              <p>
                                Qty:
                                {" "}
                                {
                                  item.quantity
                                }
                              </p>

                              <p>
                                ₹{
                                  item.foodId?.price
                                }
                              </p>

                            </div>

                          </div>

                        ))
                      }

                    </div>

                    {/* ORDER DETAILS */}

                    <div className="
                      mt-6
                      grid
                      md:grid-cols-3
                      gap-4
                    ">

                      <div className="
                        bg-gray-100
                        p-4
                        rounded
                      ">

                        <h2 className="
                          font-bold
                        ">
                          Delivery
                        </h2>

                        <p>
                          {
                            order.deliveryType
                          }
                        </p>

                      </div>

                      <div className="
                        bg-gray-100
                        p-4
                        rounded
                      ">

                        <h2 className="
                          font-bold
                        ">
                          Payment
                        </h2>

                        <p>
                          {
                            order.paymentMethod
                          }
                        </p>

                      </div>

                      <div className="
                        bg-gray-100
                        p-4
                        rounded
                      ">

                        <h2 className="
                          font-bold
                        ">
                          Total
                        </h2>

                        <p>
                          ₹{
                            order.totalPrice
                          }
                        </p>

                      </div>

                    </div>

                  </div>

                ))
              }

            </div>

          ) : (

            <h2 className="
              text-2xl
            ">
              No Orders Found
            </h2>

          )
        }

      </div>

    </div>
  );
}