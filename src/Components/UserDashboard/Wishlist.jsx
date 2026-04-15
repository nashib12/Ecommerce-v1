import React, { useContext } from "react";
import DataContext from "../../Context/DataContext";
import { Link } from "react-router-dom";
import ProductImg from "../../../public/Images/ProductImg/card1.webp";

function Wishlist() {
  const { wishList } = useContext(DataContext);
  return (
    <div>
      <h2 className="font-semibold tracking-wide text-2xl mb-6">My WishList</h2>
      {wishList?.length === 0 ? (
        <div>
          <p className="text-lg">
            There is no item in your wishlist.{" "}
            <Link to={"/all-products"} className="text-blue-600">
              View Products
            </Link>{" "}
          </p>
        </div>
      ) : (
        <>
          <div className="hidden md:grid grid-cols-[auto_1fr_auto_auto] gap-6 items-center">
            <img
              src={ProductImg}
              alt="product image"
              className="h-32 w-32 object-contain"
            />
            <div className="flex flex-col gap-1.5">
              <p className="text-lg">The Brushed Flannel Caro Shirt</p>
              <p className="text-lg tracking-wide">$180.00</p>
              <p>Date added: April 8, 2026</p>
            </div>
            <button className="bg-black text-white h-12 w-fit px-4 cursor-pointer border transition-colors duration-300 ease-in-out hover:bg-white hover:text-black">
              Select Option
            </button>
            <button className="text-red-600 h-12 w-fit px-4 cursor-pointer border border-red-600 transition-colors duration-300 ease-in-out hover:bg-red-600 hover:text-white">
              Remove
            </button>
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
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Wishlist;
