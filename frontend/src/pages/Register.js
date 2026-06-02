import { useState } from "react";

import API from "../services/api";

export default function Register() {

  const [form, setForm] = useState({
    name:"",
    email:"",
    password:"",
    role:"user",
  });

  const submitHandler = async (e) => {

    e.preventDefault();

    try {

      await API.post(
        "/auth/register",
        form
      );

      alert("Register Success");

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Register Failed"
      );

    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">

      <form
        onSubmit={submitHandler}
        className="bg-white p-8 rounded-lg shadow-lg w-96"
      >

        <h2 className="text-2xl font-bold mb-6 text-center">
          Register
        </h2>

        <input
          type="text"
          placeholder="Name"
          className="w-full border p-3 mb-4 rounded"
          onChange={(e)=>
            setForm({
              ...form,
              name:e.target.value
            })
          }
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-3 mb-4 rounded"
          onChange={(e)=>
            setForm({
              ...form,
              email:e.target.value
            })
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 mb-4 rounded"
          onChange={(e)=>
            setForm({
              ...form,
              password:e.target.value
            })
          }
        />

        <select
          className="w-full border p-3 mb-4 rounded"
          onChange={(e)=>
            setForm({
              ...form,
              role:e.target.value
            })
          }
        >
          <option value="user">
            User
          </option>

          <option value="seller">
            Seller
          </option>
        </select>

        <button
          className="w-full bg-green-500 text-white py-3 rounded"
        >
          Register
        </button>

      </form>

    </div>
  );
}