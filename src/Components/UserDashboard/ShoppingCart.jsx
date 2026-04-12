import React, { useContext } from "react";
import DataContext from "../../Context/DataContext";
import { Link } from "react-router-dom";

function ShoppingCart({setDashboardNavigation}) {
  const { cartItems } = useContext(DataContext);
  return (
    <div>
      <h2 className="font-semibold tracking-wide text-2xl mb-6">
        My Shopping Cart
      </h2>
      {cartItems.length === 0 ? (
        <div>
          <p className="text-lg">
            There is no item in your cart.{" "}
            <Link to={"/all-products"} className="text-blue-600">
              Continue Shopping
            </Link>{" "}
          </p>
        </div>
      ) : (
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
            <tr className="h-16 border-b text-center">
              <td className="border-x">#1986</td>
              <td className="border-r">8 April, 2026</td>
              <td className="border-r">
                <span className="text-yellow-500">Pending</span>
              </td>
              <td className="border-r">$ 135.00</td>
              <td className="border-r">
                <button onClick={() => setDashboardNavigation("order-details")} className="text-blue-600 cursor-pointer">
                  View Details
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ShoppingCart;
