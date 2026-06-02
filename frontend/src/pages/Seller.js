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

export default function Seller() {

  const { user } =
    useContext(AuthContext);

  const [foods, setFoods] =
    useState([]);

  const [orders, setOrders] =
    useState([]);

  const [form, setForm] =
    useState({
      title: "",
      description: "",
      price: "",
      image: null,
      category: "",
    });

  useEffect(() => {

    fetchFoods();

    fetchOrders();

  }, []);

  // FETCH SELLER FOODS
  const fetchFoods = async () => {

    try {

      const { data } = await API.get(
        "/foods/seller",
        {
          headers: {
            Authorization:
              `Bearer ${user.token}`,
          },
        }
      );

      setFoods(data);

    } catch (error) {

      console.log(error);

    }
  };

  // FETCH SELLER ORDERS
  const fetchOrders = async () => {

    try {

      const { data } = await API.get(
        "/orders/seller-orders",
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

  // ADD FOOD
  const addFood = async (e) => {

    e.preventDefault();

    try {

      const formData =
        new FormData();

      formData.append(
        "title",
        form.title
      );

      formData.append(
        "description",
        form.description
      );

      formData.append(
        "price",
        form.price
      );

      formData.append(
        "category",
        form.category
      );

      formData.append(
        "image",
        form.image
      );

      await API.post(
        "/foods/add",
        formData,
        {
          headers: {
            Authorization:
              `Bearer ${user.token}`,
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      alert("Food Added Successfully");

      setForm({
        title: "",
        description: "",
        price: "",
        image: null,
        category: "",
      });

      fetchFoods();

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Food Upload Failed"
      );

    }
  };

  // DELETE FOOD
  const deleteFood = async (id) => {

    try {

      await API.delete(
        `/foods/${id}`,
        {
          headers: {
            Authorization:
              `Bearer ${user.token}`,
          },
        }
      );

      fetchFoods();

    } catch (error) {

      console.log(error);

    }
  };

  // UPDATE STATUS
  const updateStatus = async (
    id,
    status
  ) => {

    try {

      await API.put(
        `/orders/${id}/status`,
        { status },
        {
          headers: {
            Authorization:
              `Bearer ${user.token}`,
          },
        }
      );

      fetchOrders();

    } catch (error) {

      console.log(error);

    }
  };

  return (

    <div className="min-h-screen bg-gray-100">

      <Navbar />

      <div className="max-w-7xl mx-auto p-8">

        <h1 className="text-4xl font-bold mb-8">
          Seller Dashboard
        </h1>

        {/* ADD FOOD */}

        <div className="bg-white p-6 rounded-lg shadow-lg mb-10">

          <h2 className="text-2xl font-bold mb-4">
            Add Food
          </h2>

          <form
            onSubmit={addFood}
            className="grid md:grid-cols-2 gap-4"
          >

            <input
              type="text"
              placeholder="Title"
              className="border p-3 rounded"
              value={form.title}
              onChange={(e)=>
                setForm({
                  ...form,
                  title:e.target.value
                })
              }
              required
            />

            <input
              type="text"
              placeholder="Category"
              className="border p-3 rounded"
              value={form.category}
              onChange={(e)=>
                setForm({
                  ...form,
                  category:e.target.value
                })
              }
              required
            />

            <input
              type="number"
              placeholder="Price"
              className="border p-3 rounded"
              value={form.price}
              onChange={(e)=>
                setForm({
                  ...form,
                  price:e.target.value
                })
              }
              required
            />

            <input
              type="file"
              className="border p-3 rounded"
              onChange={(e)=>
                setForm({
                  ...form,
                  image:e.target.files[0]
                })
              }
              required
            />

            <textarea
              placeholder="Description"
              className="border p-3 rounded md:col-span-2"
              value={form.description}
              onChange={(e)=>
                setForm({
                  ...form,
                  description:e.target.value
                })
              }
              required
            />

            <button
              className="bg-orange-500 text-white py-3 rounded md:col-span-2"
            >
              Add Food
            </button>

          </form>

        </div>

        {/* FOODS */}

        <div className="mb-12">

          <h2 className="text-3xl font-bold mb-6">
            My Foods
          </h2>

          <div className="grid md:grid-cols-3 gap-6">

            {
              foods.map(food => (

                <div
                  key={food._id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden"
                >

                  <img
                    src={`http://localhost:5000/${food.image}`}
                    alt=""
                    className="h-52 w-full object-cover"
                  />

                  <div className="p-4">

                    <h2 className="text-xl font-bold">
                      {food.title}
                    </h2>

                    <p className="text-gray-600 mt-2">
                      {food.category}
                    </p>

                    <p className="font-bold mt-2">
                      ₹{food.price}
                    </p>

                    <button
                      onClick={()=>
                        deleteFood(food._id)
                      }
                      className="mt-4 w-full bg-red-500 text-white py-2 rounded"
                    >
                      Delete
                    </button>

                  </div>

                </div>

              ))
            }

          </div>

        </div>

        {/* ORDERS */}

        <div>

          <h2 className="text-3xl font-bold mb-6">
            Seller Orders
          </h2>

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
                        {order.userId?.name}
                      </h2>

                      <p>
                        {order.userId?.email}
                      </p>

                    </div>

                    <div>

                      <span
                        className="bg-orange-500 text-white px-4 py-2 rounded-full"
                      >
                        {order.orderStatus}
                      </span>

                    </div>

                  </div>

                  <div className="mt-6 space-y-4">

                    {
                      order.items.map(item => (

                        <div
                          key={item._id}
                          className="border-b pb-4 flex items-center gap-4"
                        >

                          <img
                            src={`http://localhost:5000/${item.foodId?.image}`}
                            alt=""
                            className="w-20 h-20 rounded object-cover"
                          />

                          <div>

                            <h2 className="font-bold text-lg">
                              {item.foodId?.title}
                            </h2>

                            <p>
                              Qty:
                              {" "}
                              {item.quantity}
                            </p>

                            <p>
                              ₹{item.foodId?.price}
                            </p>

                          </div>

                        </div>

                      ))
                    }

                  </div>

                  {/* ORDER INFO */}

                  <div className="grid md:grid-cols-3 gap-4 mt-6">

                    <div className="bg-gray-100 p-4 rounded">

                      <h2 className="font-bold">
                        Delivery
                      </h2>

                      <p>
                        {order.deliveryType}
                      </p>

                    </div>

                    <div className="bg-gray-100 p-4 rounded">

                      <h2 className="font-bold">
                        Payment
                      </h2>

                      <p>
                        {order.paymentMethod}
                      </p>

                    </div>

                    <div className="bg-gray-100 p-4 rounded">

                      <h2 className="font-bold">
                        Total
                      </h2>

                      <p>
                        ₹{order.totalPrice}
                      </p>

                    </div>

                  </div>

                  {/* STATUS BUTTONS */}

                  <div className="grid md:grid-cols-4 gap-3 mt-6">

                    <button
                      onClick={()=>
                        updateStatus(
                          order._id,
                          "Accepted"
                        )
                      }
                      className="bg-blue-500 text-white py-2 rounded"
                    >
                      Accept
                    </button>

                    <button
                      onClick={()=>
                        updateStatus(
                          order._id,
                          "Preparing"
                        )
                      }
                      className="bg-yellow-500 text-white py-2 rounded"
                    >
                      Preparing
                    </button>

                    <button
                      onClick={()=>
                        updateStatus(
                          order._id,
                          "Out For Delivery"
                        )
                      }
                      className="bg-purple-500 text-white py-2 rounded"
                    >
                      Out
                    </button>

                    <button
                      onClick={()=>
                        updateStatus(
                          order._id,
                          "Delivered"
                        )
                      }
                      className="bg-green-500 text-white py-2 rounded"
                    >
                      Delivered
                    </button>

                  </div>

                </div>

              ))
            }

          </div>

        </div>

      </div>

    </div>
  );
}