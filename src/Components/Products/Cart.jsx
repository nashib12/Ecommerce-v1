import React from "react";
import { useContext } from "react";
import DataContext from "../../Context/DataContext";
import EmptyCartImg from "../../../public/Icons/empty-cart.png";
import { Link } from "react-router-dom";
import DeleteIcon from "../../../public/Icons/delete.png";
import PlusIcon from "../../../public/Icons/plus.png";
import MinusIcon from "../../../public/Icons/minus.png";

function Cart() {
  const { cartItems, dispatch, subTotal, total, deliveryCharge } =
    useContext(DataContext);

  return (
    <section
      id="cart"
      className="max-w-7xl mx-auto px-6 py-6 md:px-12 md:py-12 min-h-screen"
    >
      {cartItems.length <= 0 ? (
        <div className="flex flex-col items-center justify-center gap-2">
          <img
            src={EmptyCartImg}
            alt="Empty Cart Image"
            className="h-40 md:h-80 w-fit object-contain"
          />
          <h1 className="text-3xl md:text-5xl tracking-wider font-semibold md:leading-12 mb-3">
            Your cart is currently empty.
          </h1>
          <p className="mb-3">
            You may check out all the available products and buy some in the
            shop
          </p>
          <Link to={"/all-products"}>
            <button className="h-12 md:h-16 w-fit px-4 md:px-8 bg-black text-white transition-colors duration-300 ease-in-out hover:bg-white hover:text-black border cursor-pointer text-xl md:text-2xl tracking-wider font-semibold">
              Return to Shop
            </button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-y-6 gap-x-0 md:gap-8">
          <div className="hidden md:block">
            <table className="table-auto w-full h-fit">
              <thead className="text-lg md:text-xl tracking-wide">
                <tr className="h-14">
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id} className="h-40">
                    <td>
                      <div className="flex gap-3">
                        <img
                          src={item.productImage}
                          alt="product image"
                          className="h-24 w-fit object-cover"
                        />
                        <div className="flex flex-col gap-2">
                          <h2 className="text-lg font-semibold">
                            {item.productName}
                          </h2>
                          <p>Color: {item.productColor}</p>
                          <p>Size: {item.productSize}</p>
                          <button
                            onClick={() =>
                              dispatch({
                                type: "products/clearItem",
                                payload: item.id,
                              })
                            }
                            className="flex items-center justify-center gap-2 h-10 w-fit px-4 cursor-pointer border border-red-600 text-red-600"
                          >
                            <img
                              src={DeleteIcon}
                              alt="delete button icon"
                              className="h-5 w-5 object-contain"
                            />
                            Remove
                          </button>
                        </div>
                      </div>
                    </td>
                    <td className="text-lg tracking-wide">
                      $ {item.productPrice}
                    </td>
                    <td>
                      <div className="flex items-center justify-center border border-gray-200 h-10 w-fit">
                        <button
                          onClick={() =>
                            dispatch({
                              type: "carts/removeItem",
                              payload: item.id,
                            })
                          }
                          className="h-full w-10 flex items-center justify-center cursor-pointer"
                        >
                          <img
                            src={MinusIcon}
                            alt="minus button icon"
                            className="h-3 w-3 object-contain"
                          />
                        </button>
                        <span className="text-lg font-semibold w-8 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            dispatch({
                              type: "carts/addItem",
                              payload: item.id,
                            })
                          }
                          className="h-full w-10 flex items-center justify-center cursor-pointer"
                        >
                          <img
                            src={PlusIcon}
                            alt="plus button icon"
                            className="h-3 w-3 object-contain"
                          />
                        </button>
                      </div>
                    </td>
                    <td className="text-lg tracking-wide">
                      $ {item.subTotal.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="md:hidden flex flex-col gap-2">
            {cartItems.map((item) => (
              <div className="border rounded-sm w-full h-fit px-2 py-2">
                <div className="flex gap-0.5 items-center">
                  <img
                    src={item.productImage}
                    alt="product Image"
                    className="h-24 w-24 object-cover"
                  />
                  <div className="flex flex-col gap-0.5 text-sm">
                    <h3 className="font-semibold text-md">
                      {item.productName}
                    </h3>
                    <p>Size: {item.productSize}</p>
                    <p>Color: {item.productColor}</p>
                    <div className="flex gap-4 items-center">
                      <div className="flex items-center justify-center border border-gray-200 h-9 w-fit">
                        <button
                          onClick={() => {
                              dispatch({
                                type: "carts/removeItem",
                                payload: item.id,
                              });
                          }}
                          className="h-full w-8 flex items-center justify-center cursor-pointer"
                        >
                          <img
                            src={MinusIcon}
                            alt="minus button icon"
                            className="h-3 w-3 object-contain"
                          />
                        </button>
                        <span className="font-semibold w-6 text-center">
                          {item.quantity === 0 ? (dispatch({type: "products/clearItem", payload: item.id})) : item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            dispatch({
                              type: "carts/addItem",
                              payload: item.id,
                            })
                          }
                          className="h-full w-8 flex items-center justify-center cursor-pointer"
                        >
                          <img
                            src={PlusIcon}
                            alt="plus button icon"
                            className="h-3 w-3 object-contain"
                          />
                        </button>
                      </div>
                      <p className="font-semibold">
                        Price ${item.productPrice}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <button
                    onClick={() =>
                      dispatch({
                        type: "products/clearItem",
                        payload: item.id,
                      })
                    }
                    className="text-sm px-4 h-9 w-fit bg-red-600 text-white rounded-sm"
                  >
                    Remove Item
                  </button>
                  <button className="text-sm px-4 h-9 w-fit bg-black text-white rounded-sm">
                    Subtotal: ${item.subTotal.toFixed(2)}
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="sticky top-6 px-6 py-6 w-full md:w-fit h-fit bg-gray-100 shadow-md">
            <h2 className="text-2xl tracking-wide mb-3">Order Summary</h2>
            <div className="flex items-center justify-between border-b border-gray-300 px-1 py-2 mb-3">
              <p>SubTotal ( {cartItems.length} Items ) :</p>
              <p>$ {subTotal}</p>
            </div>
            <div className="flex items-center justify-between border-b border-gray-300 px-1 py-2 mb-3 md:mb-6">
              <p>Shipping Fee :</p>
              <p>$ {deliveryCharge}</p>
            </div>
            <div className="border overflow-hidden w-full md:w-80 h-12 grid grid-cols-[1fr_auto] mb-3 md:mb-6">
              <input
                type="text"
                className="outline-none px-2 h-full w-30 md:w-full"
                placeholder="Enter Voucher Code"
              />
              <button className="px-4 h-full flex items-center justify-center md:w-fit border-l cursor-pointer">
                Apply
              </button>
            </div>
            <div className="flex items-center justify-between mb-3 md:mb-6 text-lg">
              <p>Total :</p>
              <p>$ {total}</p>
            </div>
            <Link to={"/check-out"}>
              <button className="border h-12 w-full bg-black text-white text-lg tracking-wide cursor-pointer transition-colors duration-300 ease-in-out hover:bg-white hover:text-black">
                Proceed to Checkout
              </button>
            </Link>
          </div>
        </div>
      )}
    </section>
  );
}

export default Cart;
