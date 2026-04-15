import React, { useContext } from "react";
import ProductImg1 from "../../public/Images/ProductImg/card1.webp";
import ProductImg2 from "../../public/Images/ProductImg/card2.webp";
import StarImg from "../../public/Icons/star.png";
import EyeImg from "../../public/Icons/view.png";
import { Tooltip } from "react-tooltip";
import { Link } from "react-router-dom";
import DataContext from "../Context/DataContext";

function ProductCard({
  id,
  image = ProductImg1,
  coverImage = ProductImg2,
  price = "$125.00",
  tag = "Cardigan",
  originalPrice,
  discount,
  slug
}) {
  const { dispatch } = useContext(DataContext);

  return (
    <div className="h-96 md:h-106 w-fit md:w-60 border-2 border-gray-300 px-2 py-2">
      <div className="relative group cursor-pointer overflow-hidden">
        {discount ? (
          <button className="absolute top-2 left-0 h-fit text-sm w-fit px-3 py-1 bg-red-700 text-white">
            -{discount}%
          </button>
        ) : (
          ""
        )}
        <img
          src={image}
          alt="product image"
          className="mb-3 h-4((0 md:h-50 w-full object-cover group-hover:hidden"
        />
        <img
          src={coverImage}
          alt="product image"
          className="mb-3 h-40 md:h-50 w-full object-cover hidden group-hover:block"
        />
        <button
          onClick={() => dispatch({type: "wishlist/addItems", payload: "Item added"})}
          data-tooltip-id={`wishlist-${id}`}
          className="absolute top-4 right-2 hidden h-9 w-9 rounded-full bg-white group-hover:flex items-center justify-center cursor-pointer"
        >
          <img
            src={StarImg}
            alt="Star Image"
            className="h-5 w-5 object-contain"
          />
        </button>
        <Tooltip id={`wishlist-${id}`}>
          <p>Add to wishlist</p>
        </Tooltip>
        <button
          data-tooltip-id={`details-${id}`}
          className="absolute top-16 right-2 hidden h-9 w-9 rounded-full bg-white group-hover:flex items-center justify-center cursor-pointer"
        >
          <img
            src={EyeImg}
            alt="eye Image"
            className="h-5 w-5 object-contain"
          />
        </button>
        <Tooltip id={`details-${id}`}>
          <p>Quick View</p>
        </Tooltip>
      </div>
      <div className="pt-2 pb-2 px-2">
        <span className="text-sm uppercase text-gray-500">{tag}</span>
        <h2 className="mt-1 mb-2 md:text-xl font-semibold ">{id}</h2>
        {originalPrice ? (
          <>
            <span className="md:text-xl tracking-wide line-through">
              $ {originalPrice}
            </span>
            &nbsp;
            <span className="md:text-xl tracking-wide text-red-500">$ {price}</span>
          </>
        ) : (
          <span className="text-xl tracking-wide">$ {price}</span>
        )}
        <Link to={`/product-details/${slug}`}>
        <button className="w-full h-9 md:h-12 text-sm md:text-md bg-gray-200 mt-3 cursor-pointer transition-colors duration-150 ease-in-out hover:bg-black hover:text-white">
          Select options
        </button></Link>
      </div>
    </div>
  );
}

export default ProductCard;
