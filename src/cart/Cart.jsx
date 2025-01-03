import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCartAsync } from "../Slices/CartSlice";
import { useNavigate } from "react-router-dom";
import { RiDeleteBinLine } from "react-icons/ri";
import { addProductToDBAndCartAsync, removeFromCartAsync , decrementProductInDBAndCartAsync } from "../Slices/CartSlice";


function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cart, loading, error } = useSelector((state) => state.cart);

  // Retrieve userId from localStorage
  const userId = localStorage.getItem("id");

  useEffect(() => {
    if (userId) {
      dispatch(fetchCartAsync(userId));
    }
  }, [dispatch, userId]);

  const totalAmount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error: {error}</h1>;

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">
          Your <span className="text-blue-500">Cart</span>
        </h1>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-2 text-sm font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none"
        >
          Continue Shopping
        </button>
      </div>

      <div className="p-6 bg-white rounded-lg shadow-md">
        {cart.length > 0 ? (
          <>
            {cart.map((product) => (
              <div
                key={product.id}
                className="flex items-center justify-between py-4 border-b border-gray-300"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="object-cover w-24 h-24 rounded-lg"
                />

                <div className="flex-1 px-6">
                  <h3 className="text-lg font-medium">{product.name}</h3>
                  <p className="mt-2">
                    <span className="text-gray-400 line-through">₹{product.oldPrice}</span>{" "}
                    <span className="text-lg font-semibold text-blue-600">₹{product.price}</span>
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() =>
                      product.quantity > 1 &&
                      dispatch(
                       decrementProductInDBAndCartAsync({ id: userId, productId: product.id })
                      )
                    }
                    className="w-8 h-8 text-lg font-bold text-gray-600 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    -
                  </button>
                  <span className="text-lg">{product.quantity}</span>
                  <button
                     onClick={() => dispatch(addProductToDBAndCartAsync({ id: userId, product }))}
                    className="w-8 h-8 text-lg font-bold text-gray-600 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => dispatch(removeFromCartAsync({ id: userId, productId:product.id}))}
                  className="ml-4 text-red-500 hover:text-red-700"
                  title="Remove item"
                >
                  <RiDeleteBinLine />
                </button>
              </div>
            ))}

            <div className="mt-6 text-right">
              <h4 className="text-lg font-semibold">
                Total Price: <span className="text-blue-600">₹{totalAmount}</span>
              </h4>
              <button
                onClick={() => navigate("/payment")}
                className="px-4 py-2 mt-2 text-xs font-semibold text-blue-600 transition border border-blue-600 rounded-full hover:bg-blue-100"
              >
                Add Order
              </button>
            </div>
          </>
        ) : (
          <p className="text-xl text-center text-gray-500">Your cart is empty.</p>
        )}
      </div>
    </div>
  );
}

export default Cart;
