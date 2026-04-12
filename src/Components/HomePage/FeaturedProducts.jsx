import React, { useContext } from "react";
import ArrowRight from "../../../public/Icons/arrow-right.png";
import ProductCard from "../ProductCard";
import DollarImg from "../../../public/Icons/dollar.png";
import CustomerSupportImg from "../../../public/Icons/headphones.png";
import CreditCardImg from "../../../public/Icons/credit-card.png";
import ShippingImg from "../../../public/Icons/free-delivery.png";
import DataContext from "../../Context/DataContext";

function FeaturedProducts() {
  const { featuredProduct } = useContext(DataContext);
  return (
    <section
      id="featured-products"
      className="max-w-7xl mx-auto px-6 md:px-12 pb-12"
    >
      <div className="bg-gray-100 border-2 border-gray-200 mb-6 md:mb-12">
        <div className="px-6 py-6 md:py-12 flex flex-col md:flex-row gap-3 items-center md:justify-between">
          <h2 className="text-2xl font-semibold">Featured Products</h2>
          <button className="flex cursor-pointer items-center md:justify-center gap-1 md:gap-2 transition-color duration-300 ease-in-out hover:text-gray-400 md:text-lg group">
            View All Categories{" "}
            <img
              src={ArrowRight}
              alt="right arrow icon"
              className="h-3 w-3 md:h-4 md:w-4 object-contain transition-all duration-300 ease-in-out group-hover:invert-75"
            />{" "}
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5">
          {featuredProduct.map((item) => (
            <div key={item.title}>
              <ProductCard
                id={item.title}
                image={item.productImage}
                coverImage={item.productCover}
                price={item.price}
                tag={item.tag}
                originalPrice={item.originalPrice}
                discount={item.discount}
                slug={item.slug}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="bg-[url(/Images/Banner/banner5.webp)] bg-cover bg-center bg-no-repeat h-60 md:h-40 w-full px-6 py-6 mb-6 md:mb-12">
        <div className="max-w-4xl h-full flex flex-col md:flex-row gap-5 md:items-center md:justify-between">
          <div>
            <h2 className="text-xl md:text-2xl tracking-wide font-semibold">
              Offer on Summer Shirts
            </h2>
            <p className="md:text-lg text-gray-500">
              Buy 2 pairs of Summer Shirts and get 1 for free!{" "}
            </p>
          </div>
          <div className="flex gap-2 text-xl md:text-2xl font-semibold">
            <span className="text-red-700">$99.00</span>
            <span className="line-through text-gray-600">$180.00</span>
          </div>
          <button className="cursor-pointer uppercase bg-white text-lg font-semibold h-14 w-fit px-4 flex items-center">
            Get this deal
          </button>
        </div>
      </div>

      <div className="grid grid-cos-1 gap-y-6 gap-x-0 sm:gap-6 sm:grid-cols-2 md:grid-cols-4">
        <div className="flex flex-row items-center gap-4">
          <img
            src={ShippingImg}
            alt="free shipping"
            className="h-16 w-16 object-contain"
          />
          <div>
            <h3 className="text-lg font-semibold">Free Shipping</h3>
            <p className="text-gray-500 text-sm">
              Free shipping on order over $200
            </p>
          </div>
        </div>
        <div className="flex flex-row items-center gap-4">
          <img
            src={DollarImg}
            alt="money back"
            className="h-12 w-12 object-contain"
          />
          <div>
            <h3 className="text-lg font-semibold">Money Back Guarantee</h3>
            <p className="text-gray-500 text-sm">
              Within 15 Days money back guarantee
            </p>
          </div>
        </div>
        <div className="flex flex-row items-center gap-4">
          <img
            src={CustomerSupportImg}
            alt="customer support"
            className="h-12 w-12 object-contain"
          />
          <div>
            <h3 className="text-lg font-semibold">Online Support</h3>
            <p className="text-gray-500 text-sm">
              24 hours a day, 7 days a week
            </p>
          </div>
        </div>
        <div className="flex flex-row items-center gap-4">
          <img
            src={CreditCardImg}
            alt="Credit Card "
            className="h-12 w-12 object-contain"
          />
          <div>
            <h3 className="text-lg font-semibold">Flexible Payment</h3>
            <p className="text-gray-500 text-sm">
              Pay with multiple credit cards
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeaturedProducts;
