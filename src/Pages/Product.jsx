import React, { useContext, useEffect, useState } from "react";
import DataContext from "../Context/DataContext";
import PlusIcon from "../../public/Icons/plus.png";
import MinusIcon from "../../public/Icons/minus.png";
import ButtonIcon from "../../public/Icons/down-chevron.png";
import ListIcon from "../../public/Icons/list.png";
import GridIcon from "../../public/Icons/grid.png";
import ProductCard from "../Components/ProductCard";
import usePagination from "../Components/Hooks/usePagination";
import Pagination from "../Components/Pagination";
import { useParams } from "react-router-dom";
import Loader from "../Components/Loader";

function Product() {
  const { category, attribute } = useContext(DataContext);
  const { catalog } = useParams();
  const [ url, setUrl ] = useState();

  useEffect(() => {
    if (catalog === "featured") {
      setUrl("http://127.0.0.1:8000/api/filtered/featured_product")
    } else if (catalog === 'catalog') {
      setUrl("http://127.0.0.1:8000/api/product");
    } else {
      setUrl(`http://127.0.0.1:8000/api/filtered_category/${catalog}`);
    }
  }, [catalog]);

  const { data: product, currentPage, lastPage, total, fetchPage, perPage, loading } = usePagination(url)
  const [ filter, setFilter ] = useState('category');
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
  const priceList = [
    "All",
    "$0 - $59",
    "$60 - $119",
    "$120 - $179",
    "$180 - $239",
    "$240+",
  ];

  if (loading) {
    return <Loader />;
  }

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
              onClick={() => setFilter((prev) => prev === 'category' ? '' : 'category')}
            >
              <h3 className="font-semibold text-lg">Categories</h3>
              <button className="cursor-pointer group">
                <img
                  src={filter === 'category' ? MinusIcon : PlusIcon}
                  alt="button icons for category toggle"
                  className="h-4 w-4 object-contain"
                />
              </button>
            </div>
            {filter === 'category' && (
              <ul className="mt-3">
                {category.map((item) => {
                  const hasParent = item.parent_id ? item.parent_id : null;
                  return (hasParent === null && <li
                    key={`CAT-${item.id}`} onClick={() => setUrl(`http://127.0.0.1:8000/api/filtered_category/${item.id}`)}
                    className={`py-2 px-4 cursor-pointer hover:bg-gray-200`}
                  >
                    {item.title}
                  </li>
                )})}
              </ul>
            )}
          </div>
          {/* color filter */}
          <div className="flex flex-col border-t-2 py-4 border-gray-300">
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => setFilter((prev) => prev === 'color' ? '' : 'color')}
            >
              <h3 className="font-semibold text-lg">Colors</h3>
              <button className="cursor-pointer group">
                <img
                  src={filter === 'color' ? MinusIcon : PlusIcon}
                  alt="button icons for category toggle"
                  className="h-4 w-4 object-contain"
                />
              </button>
            </div>
            { filter === 'color' && <ul className="mt-3">
                { attribute.color.map(item => 
                  <li key={`ATTR-CLR-${item.id}`} onClick={() => setUrl(`http://127.0.0.1:8000/api/filtered_color/${item.id}`)} className={`py-2 px-4 cursor-pointer hover:bg-gray-200 flex items-center gap-2`}><div className="h-6 w-6 rounded-full" style={{ backgroundColor : `${item.meta.hex_code}`}} />{item.value}</li>
                )}
              </ul>}
          </div>
          {/* size filter */}
          <div className="flex flex-col border-t-2 py-4 border-gray-300">
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => setFilter((prev) => prev === 'sizes' ? '' : 'sizes')}
            >
              <h3 className="font-semibold text-lg">Sizes</h3>
              <button className="cursor-pointer group">
                <img
                  src={filter === 'sizes' ? MinusIcon : PlusIcon}
                  alt="button icons for category toggle"
                  className="h-4 w-4 object-contain"
                />
              </button>
            </div>
            { filter === 'sizes' && <ul className="mt-3">
                { attribute.sizes.map(item => 
                  <li key={`ATTR-SIZE-${item.id}`} onClick={() => setUrl(`http://127.0.0.1:8000/api/filtered_color/${item.id}`)} className={`py-2 px-4 cursor-pointer hover:bg-gray-200`}>{item.value}</li>
                )}
              </ul>}
          </div>
          {/* price filter */}
          <div className="flex flex-col border-t-2 pt-4 border-gray-300">
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => setFilter((prev) => prev === 'price' ? '' : 'price')}
            >
              <h3 className="font-semibold text-lg">Price</h3>
              <button className="cursor-pointer group">
                <img
                  src={filter === 'prize' ? MinusIcon : PlusIcon}
                  alt="button icons for category toggle"
                  className="h-4 w-4 object-contain"
                />
              </button>
            </div>
            {filter === 'price' && (
              <ul className="mt-3">
                {priceList.map((item, index) => (
                  <li
                    key={index}
                    className="py-2 px-4 cursor-pointer hover:bg-gray-200"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className="col-span-9 md:px-8 md:py-6 md:bg-gray-100 md:shadow-sm rounded-md">
          <h2 className="mb-6 text-2xl tracking-wide font-semibold">Shop</h2>
          <div className="flex flex-col md:flex-row gap-3 md:items-center justify-between mb-6">
            <p className="text-xl text-gray-500">Showing { perPage } of {total} results</p>
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
          <div className="grid grid-cols-2 md:grid-cols-3 gap-0 md:gap-6 ">
             { product?.map(item => (
              <ProdcutList item={item} />
             ))}
             
          </div>
          <div className="flex items-center justify-center mt-4">
            <Pagination currentPage={currentPage} lastPage={lastPage} onPageChange={fetchPage} /> 
          </div>
        </div>
      </div>
    </section>
  );
}

export default Product;

function ProdcutList({ item }) {
  return (
    <div key={`PRO_CARD-${item.id}`}>
      <ProductCard
        id={item.id}
        title={item.name}
        image={item.primary_image?.image_url}
        sale_price={item.sales_amount}
        tag={item.categories?.title}
        originalPrice={item.base_price}
        discount={item.sale_price}
        slug={item.slug}
        is_featured={item.is_featured}
      />
    </div>
  );
}
