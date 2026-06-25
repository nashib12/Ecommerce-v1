import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import authAPi from "../../lib/authAxios";
import { toast } from "react-toastify";

function Wishlist() {
 const { wishlist } = useAuth();
 const formatDate = (date) => {
  const newDate = new Date(date).toLocaleDateString('en-US', {
    year: "numeric",
    month: 'long',
    day: 'numeric',
  });
  return newDate;
 }

 const queryClient = useQueryClient();

 const mutateDeleteWishlist = useMutation({
  mutationFn: ({ id }) => authAPi.delete(`/wishlist/delete/${id}`),
  onSuccess: (response) => {
    toast.success(response.data.message);
    queryClient.invalidateQueries({ queryKey : ['wishlist']});
  },
  onError: () => {
    toast.error("Something went wrong while deleting item");
  }
 });

  return (
    <div>
      <h2 className="font-semibold tracking-wide text-2xl mb-6">My WishList</h2>
      {wishlist?.length === 0 ? (
        <div>
          <p className="text-lg">
            There is no item in your wishlist.{" "}
            <Link to={"/all_products/catalog"} className="text-blue-600">
              View Products
            </Link>{" "}
          </p>
        </div>
      ) : (
        <>
        <div className="hidden md:flex flex-col gap-6">
          {wishlist.map(item => (
          <div key={`WISHLIST-${item.id}`} className="grid grid-cols-[auto_1fr_auto_auto] gap-6 items-center">
            <img
              src={item.product?.image}
              alt="product image"
              className="h-26 w-26 object-cover rounded"
            />
            <div className="flex flex-col gap-1.5">
              <p className="text-xl">{item.product?.name}</p>
              { item.product?.sale_price > 0 ? (<p className="text-lg tracking-wide"> <span className="line-through">$ {item.product?.price}</span> &nbsp;&nbsp; <span className="text-red-600">$ {item.product?.sale_price}</span> </p>) : (<p className="text-lg tracking-wide">$ {item.product?.price}</p>) }
              <p>Date added: {formatDate(item.date)}</p>
            </div>
            <Link to={`/product-details/${item.product?.slug}/${item.product?.category_id}`}>
            <button className="bg-black text-white h-12 w-fit px-4 cursor-pointer border transition-colors duration-300 ease-in-out hover:bg-white hover:text-black">
              Select Option
            </button></Link>
            <button onClick={() => mutateDeleteWishlist.mutate({id: item.id})} className="text-red-600 h-12 w-fit px-4 cursor-pointer border border-red-600 transition-colors duration-300 ease-in-out hover:bg-red-600 hover:text-white">
              Remove
            </button>
          </div>
          ))}
        </div>
          <div className="md:hidden flex flex-col gap-2">
            {wishlist.map(item => (
            <div key={`WISHLIST-${item.id}`} className="border rounded-sm w-full h-fit px-2 py-2">
              <div className="flex gap-0.5 items-center">
                <img
                  src={item.product?.image_url}
                  alt="product Image"
                  className="h-24 w-24 object-cover"
                />
                <div className="flex flex-col gap-0.5 text-xs">
                  <h3 className="font-semibold text-sm">
                    {item.product?.name}
                  </h3>
                  { item.product?.sale_price > 0 ? (<p className="tracking-wide"> <span className="line-through">$ {item.product?.price}</span> <span className="text-red-600">$ {item.product?.sale_price}</span> </p>) : (<p className="text-lg tracking-wide">$ {item.product?.price}</p>) }
                </div>
              </div>
              <div className="flex justify-end mt-3">
                <button className="text-sm px-4 h-9 w-fit bg-black text-white rounded-sm">
                  Add to Cart
                </button>
              </div>
            </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Wishlist;
