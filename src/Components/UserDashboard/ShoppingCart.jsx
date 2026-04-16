import React, { useContext } from "react";
import DataContext from "../../Context/DataContext";
import { Link } from "react-router-dom";
import ProductImg from "../../../public/Images/ProductImg/card1.webp";

function ShoppingCart({ setDashboardNavigation }) {
  const { cartItems } = useContext(DataContext);
  const date = new Date();
  return (
    <div>
      <h2 className="font-semibold tracking-wide text-lg md:text-2xl mb-3 md:mb-6">
        My Shopping Cart
      </h2>
      {cartItems.length === 0 ? (
        <div>
          <p className="md:text-lg">
            There is no item in your cart.{" "}
            <Link to={"/all-products"} className="text-blue-600">
              Continue Shopping
            </Link>{" "}
          </p>
        </div>
      ) : (
        <>
          <div className="hidden md:block">
            <table className="table-fixed w-full">
              <thead>
                <tr className="h-16 border-y">
                  <th className="border-x">Order No.</th>
                  <th className="border-r">Date</th>
                  <th className="border-r">Status</th>
                  <th className="border-r">Total</th>
                  <th className="border-r">Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map(item => (
                <tr key={item.id} className="h-16 border-b text-center">
                  <td className="border-x">{item.orderId}</td>
                  <td className="border-r">{ `${date.getDay()}-${date.getMonth()}-${date.getFullYear()}`}</td>
                  <td className="border-r">
                    <span className="text-yellow-500">Pending</span>
                  </td>
                  <td className="border-r">$ {item.subTotal.toFixed(2)}</td>
                  <td className="border-r">
                    <button
                      onClick={() => setDashboardNavigation("order-details")}
                      className="text-blue-600 cursor-pointer"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="md:hidden flex flex-col gap-2">
            <div className="border rounded-sm w-full h-fit px-2 py-2">
              <div className="flex gap-0.5 items-center">
                <img
                  src={ProductImg}
                  alt="product Image"
                  className="h-24 w-24 object-cover"
                />
                <div className="flex flex-col gap-0.5 text-xs">
                  <h3 className="font-semibold text-sm">
                    The Alpaca Waffle-Stitch Polo - Dark Wheat
                  </h3>
                  <p>Size: XS</p>
                  <p>Color: red</p>
                  <div className="flex justify-between items-center">
                    <p>Quantity: 1</p>
                    <p className="font-semibold">Total $180.00</p>
                  </div>
                </div>
              </div>
              <div className="flex justify-end mt-3">
                <button className="text-sm px-4 h-9 w-fit bg-black text-white rounded-sm">
                  Proceed
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ShoppingCart;
