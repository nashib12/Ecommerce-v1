import React, { useContext, useEffect, useState } from "react";
import DataContext from "../Context/DataContext";
import PlusIcon from "../../public/Icons/plus.png";
import MinusIcon from "../../public/Icons/minus.png";
import ButtonIcon from "../../public/Icons/down-chevron.png";
import ListIcon from "../../public/Icons/list.png";
import GridIcon from "../../public/Icons/grid.png";
import ProductCard from "../Components/ProductCard";

function Product() {
  const { category, featuredProduct } = useContext(DataContext);
  const [categoryFilter, setCategoryFilter] = useState(true);
  const [priceFilter, setPriceFilter] = useState(true);
  const [colorFilter, setColorFilter] = useState(false);
  const [sizeFilter, setSizeFilter] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const sortingList = [
    "Default Sorting",
    "Popularity",
    "Average Rating",
    "Latest",
    "Price: Low to High",
    "Price High to Low",
  ];
  const [dropdownItem, setdropdownItem] = useState(sortingList[0]);
  const priceList = ["All", "$0 - $59", "$60 - $119", "$120 - $179", "$180 - $239", "$240+"]
  const [filteredProduct, setFilteredProduct] = useState([]);
  const [ filter, setFilter ] = useState("");

  useEffect(() => {
    if(filter === "") return;
    setFilteredProduct(featuredProduct.filter(item => item.tag.toLowerCase() === filter.toLowerCase() ));
  }, [filter, featuredProduct]);

  return (
    <section
      id="products"
      className="max-w-7xl mx-auto px-6 py-6 md:px-12 md:py-12"
    >
      <div className="md:grid grid-cols-12 gap-6">
        <div className="hidden md:block col-span-3 px-4 py-6 bg-gray-100 shadow-sm rounded-md h-fit ">
          <h2 className="mb-6 text-2xl tracking-wide font-semibold">Filters</h2>
          {/* categroy filter */}
          <div className="flex flex-col border-t-2 py-4 border-gray-300">
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => setCategoryFilter((prev) => !prev)}
            >
              <h3 className="font-semibold text-lg">Categories</h3>
              <button className="cursor-pointer group">
                <img
                  src={categoryFilter ? MinusIcon : PlusIcon}
                  alt="button icons for category toggle"
                  className="h-4 w-4 object-contain"
                />
              </button>
            </div>
            {categoryFilter && (
              <ul className="mt-3">
                {category.map((item) => (
                  <li onClick={() => setFilter(item.value)}
                    key={item.id}
                    className={`py-2 px-4 cursor-pointer hover:bg-gray-200 ${filter === item.value ? "bg-gray-300" : ""}`}
                  >
                    {item.value}
                  </li>
                ))}
              </ul>
            )}
          </div>
          {/* color filter */}
          <div className="flex flex-col border-t-2 py-4 border-gray-300">
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => setColorFilter((prev) => !prev)}
            >
              <h3 className="font-semibold text-lg">Colors</h3>
              <button className="cursor-pointer group">
                <img
                  src={colorFilter ? MinusIcon : PlusIcon}
                  alt="button icons for category toggle"
                  className="h-4 w-4 object-contain"
                />
              </button>
            </div>
          </div>
          {/* size filter */}
          <div className="flex flex-col border-t-2 py-4 border-gray-300">
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => setSizeFilter((prev) => !prev)}
            >
              <h3 className="font-semibold text-lg">Sizes</h3>
              <button className="cursor-pointer group">
                <img
                  src={sizeFilter ? MinusIcon : PlusIcon}
                  alt="button icons for category toggle"
                  className="h-4 w-4 object-contain"
                />
              </button>
            </div>
          </div>
          {/* price filter */}
          <div className="flex flex-col border-t-2 pt-4 border-gray-300">
            <div className="flex items-center justify-between cursor-pointer" onClick={() => setPriceFilter(prev => !prev)}>
              <h3 className="font-semibold text-lg">Price</h3>
              <button className="cursor-pointer group">
                <img
                  src={priceFilter ? MinusIcon : PlusIcon}
                  alt="button icons for category toggle"
                  className="h-4 w-4 object-contain"
                />
              </button>
            </div>
            {priceFilter && ( 
              <ul className="mt-3">{ priceList.map((item, index) => (
                <li key={index} className="py-2 px-4 cursor-pointer hover:bg-gray-200">{item}</li>
              ))}</ul>
            )}
          </div>
        </div>
        <div className="col-span-9 md:px-8 md:py-6 md:bg-gray-100 md:shadow-sm rounded-md">
          <h2 className="mb-6 text-2xl tracking-wide font-semibold">Shop</h2>
          <div className="flex flex-col md:flex-row gap-3 md:items-center justify-between mb-6">
            <p className="text-xl text-gray-500">Showing 12 of 34 results</p>
            <div className="flex gap-4">
              <div className="relative">
                <button
                  onClick={() => setDropdown((prev) => !prev)}
                  className="flex items-center gap-3 justify-center curso-pointer h-10 border w-fit px-4 group"
                >
                  {dropdownItem}{" "}
                  <img
                    src={ButtonIcon}
                    alt="button icon"
                    className={`h-4 w-4 object-contain transition-transform duration-300 ease-in-out group-hover:rotate-180 ${dropdown ? "rotate-180" : "rotate-0"}`}
                  />
                </button>
                {dropdown && (
                  <ul className="h-fit w-48 bg-gray-100 absolute top-full left-0 mt-1 z-999">
                    {sortingList.map((item, index) => (
                      <li
                        key={index}
                        className="hover:bg-gray-200 cursor-pointer px-4 py-2"
                        onClick={() => {
                          setdropdownItem(item);
                          setDropdown(false);
                        }}
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <button className="h-10 w-10 flex items-center justify-center cursor-pointer border">
                <img
                  src={ListIcon}
                  alt="list button icon"
                  className="h-6 w-6 object-contain"
                />
              </button>
              <button className="h-10 w-10 flex items-center justify-center cursor-pointer border">
                <img
                  src={GridIcon}
                  alt="grid button icon"
                  className="h-6 w-6 object-contain"
                />
              </button>
            </div>
          </div>

          {/* product list */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 ">
            { filteredProduct.length === 0 ? featuredProduct.map((item) => (
              <ProdcutList item={item} />
            )) : filteredProduct.map((item => <ProdcutList item={item} />))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Product;

function ProdcutList ( { item }) {
  return (
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
                />{" "}
              </div>
  );
}
