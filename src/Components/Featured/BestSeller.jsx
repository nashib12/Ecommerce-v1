import React, { useContext, useEffect, useState } from "react";
import DataContext from "../../Context/DataContext";
import ProductCard from "../ProductCard";
import ListIcon from "../../../public/Icons/list.png";
import GridIcon from "../../../public/Icons/grid.png";
import ButtonIcon from "../../../public/Icons/down-chevron.png";

function BestSeller() {
  const { featuredProduct } = useContext(DataContext);
  const [filterProduct, setFilterProduct] = useState([]);
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
  useEffect(() => {
    const selected = featuredProduct.filter(
      (item) => item.tag === "best sellers",
    );
    setFilterProduct(selected);
    console.log("selected", selected);
  }, [featuredProduct]);
  if (!featuredProduct || featuredProduct.length === 0) return;

  return (
    <div className="md:px-8 md:py-6 md:bg-gray-100 md:shadow-sm rounded-md">
      <h2 className="mb-6 text-2xl tracking-wide font-semibold">
        Shop - Best Seller
      </h2>
      <div className="flex flex-col md:flex-row gap-3 md:items-center justify-between mb-6 md:mb-12">
        <p className="text-xl text-gray-500">
          Showing {filterProduct.length} of {filterProduct.length} results
        </p>
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

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 ">
        {filterProduct.map((item, index) => (
          <div key={index}>
            <ProductCard
              id={item.id}
              title={item.title}
              image={item.itemImage}
              coverImage={item.itemCover}
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
  );
}

export default BestSeller;
