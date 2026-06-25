import React from "react";
import ProductImg1 from "../../public/Images/ProductImg/card1.webp";
import StarImg from "../../public/Icons/star.png";
import EyeImg from "../../public/Icons/view.png";
import { Tooltip } from "react-tooltip";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../Context/AuthContext";

function ProductCard({
  id,
  title,
  image = ProductImg1,
  sale_price,
  tag ,
  originalPrice,
  discount,
  slug, is_featured, catId
}) {


  const { user, mutateWishlist } = useAuth();

  const handleAddtoWishlist = (id ) => {
    const formdata = new FormData();
    formdata.append('product_id', id)
    if(user) {
      mutateWishlist.mutate({ formdata });
    } else {
      toast.error("You must be logged in to add product to wishlist.");
    }
  }
  return (
    <div className="h-fit md:h-106 w-fit md:w-60 border-2 border-gray-300 md:px-2 py-2">
      <div className="relative group cursor-pointer overflow-hidden">
        {discount && (
          <button className="absolute top-2 left-0 h-fit text-xs  w-fit px-2 py-1 bg-red-700 text-white">
            -{discount}%
          </button>
        ) }
        <img
          src={image}
          alt="product image"
          className="mb-3 h-40 md:h-50 w-full object-cover"
        />
        <button
          onClick={() => handleAddtoWishlist(id)}
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
        <div className="flex items-center justify-between mb-3">
        <span className="text-xs uppercase text-gray-500">{tag}</span>
        {is_featured && (
          <button className="h-fit text-xs  w-fit px-2 py-1 bg-green-700 text-white">
            Featured
          </button>
        )}
        </div>
        <h2 className="mt-1 mb-2 text-sm md:text-xl font-semibold ">{title}</h2>
        { sale_price > 0 ? (
          <>
            <span className="md:text-xl tracking-wide line-through">
              ${originalPrice}
            </span>
            &nbsp;
            <span className="md:text-xl tracking-wide text-red-500">${sale_price}</span>
          </>
        ) : (
          <span className="md:text-xl tracking-wide">$ {originalPrice}</span>
        )}
        <Link to={`/product-details/${slug}/${catId}`}>
        <button className="w-full h-9 md:h-12 text-sm md:text-md bg-gray-200 mt-3 cursor-pointer transition-colors duration-150 ease-in-out hover:bg-black hover:text-white">
          View Details
        </button></Link>
      </div>
    </div>
  );
}

export default ProductCard;
