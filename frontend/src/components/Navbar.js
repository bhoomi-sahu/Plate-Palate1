import { Link } from "react-router-dom";

import {
  useContext,
} from "react";

import {
  AuthContext,
} from "../context/AuthContext";

export default function Navbar() {

  const {
    user,
    logout,
  } = useContext(AuthContext);

  return (

    <nav className="bg-orange-500 text-white px-8 py-4 flex justify-between items-center">

      <Link
        to="/"
        className="text-2xl font-bold"
      >
        GharKaKhana
      </Link>

      <div className="flex gap-4 items-center">

        {
          user ? (

            <>

              <span>
                Hi, {user.name}
              </span>

              <Link to="/cart">
                Cart
              </Link>

              <Link to="/my-orders">
                My Orders
              </Link>


              <Link to="/chat">
                   Chat
                   </Link>

              {
                user.role === "seller" && (

                  <Link to="/seller">
                    Seller
                  </Link>

                )
              }

              <button
                onClick={logout}
                className="bg-white text-orange-500 px-4 py-1 rounded"
              >
                Logout
              </button>

            </>

          ) : (

            <>

              <Link to="/login">
                Login
              </Link>

              <Link to="/register">
                Register
              </Link>

            </>

          )
        }

      </div>

    </nav>
  );
}