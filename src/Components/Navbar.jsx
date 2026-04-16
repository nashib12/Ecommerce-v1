import React, { useEffect, useState } from "react";
import DropdownIcon from "../../public/Icons/down-chevron.png";
import FacebookImg from "../../public/Icons/facebook.png";
import InstagramImg from "../../public/Icons/instagram.png";
import TikTokImg from "../../public/Icons/tik-tok.png";
import TwitterImg from "../../public/Icons/twitter.png";
import ShoppingBagImg from "../../public/Icons/shopping-bag.png";
import SearchImg from "../../public/Icons/search.png";
import MenuImg from "../../public/Icons/menu.png";
import NextImg from "../../public/Icons/next.png";
import { useContext } from "react";
import DataContext from "../Context/DataContext";
import { Link, useLocation } from "react-router-dom";
import { useLenis } from "lenis/react";

function Navbar() {
  const lanugage = [
    { id: "EN", value: "English" },
    { id: "NP", value: "Nepali" },
  ];
  const currency = [
    { id: "USD", value: "USD" },
    { id: "NPR", value: "NPR" },
    { id: "GBP", value: "GBP" },
  ];
  const [dropdown, setDropdown] = useState(false);
  const [categoryMenu, setCategoryMenu] = useState(false);
  const [subcategory, setSubcategory] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const { category, setLoginModal, cartItems } = useContext(DataContext);
  const location = useLocation();
  const lenis = useLenis();


  useEffect(() => {
    lenis?.scrollTo(0);
  }, [location]);

  return (
    <>
      <nav>
        <div className="bg-red-700 w-full">
          <div className="max-w-7xl mx-auto py-2 px-6 md:px-12">
            <div className="flex justify-between">
              <div className="flex gap-6 items-center">
                <button className="rounded-full h-fit py-1 w-fit px-6 bg-white font-bold tracking-wide">
                  HOT
                </button>
                <p className="text-white text-sm md:text-md">
                  Free Express Shipping on orders more than $200!
                </p>
              </div>
              <div className="hidden md:flex gap-6 items-center">
                <DropdownMenu
                  dropdown={dropdown}
                  setDropdown={setDropdown}
                  id="language"
                  data={lanugage}
                  defaultText="English"
                  customProp="w-28 h-fit py-2 bg-black text-white"
                  invert="invert"
                />
                <DropdownMenu
                  dropdown={dropdown}
                  setDropdown={setDropdown}
                  id="currency"
                  data={currency}
                  defaultText="USD"
                  customProp="w-22 h-fit py-2 bg-black text-white"
                  invert="invert"
                />

                <a href="#" target="blank">
                  <img
                    src={FacebookImg}
                    alt="Facebook Image"
                    className="h-5 w-5 object-contain invert"
                  />
                </a>
                <a href="#" target="blank">
                  <img
                    src={InstagramImg}
                    alt="Instagram image"
                    className="h-5 w-5 object-contain invert"
                  />
                </a>
                <a href="#" target="blank">
                  <img
                    src={TikTokImg}
                    alt="tik-tok image"
                    className="h-5 w-5 object-contain invert"
                  />
                </a>
                <a href="#" target="blank">
                  <img
                    src={TwitterImg}
                    alt="twitter image"
                    className="h-5 w-5 object-contain invert"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* Second Navbar */}
        <div className="hidden md:block bg-gray-100 w-full">
          <div className=" max-w-7xl mx-auto">
            <div className="grid grid-cols-[auto_1fr_auto] items-center gap-16 px-6 md:px-12 py-6">
              <Link to={'/'}>
              <h2 className="font-bold text-3xl tracking-wider">
                <span className="text-5xl">M</span>egastore
              </h2>
              </Link>
              <div className="w-full h-12 flex items-center justify-center">
                <div className="border w-160 h-full flex">
                  <DropdownMenu
                    dropdown={dropdown}
                    setDropdown={setDropdown}
                    id="category"
                    customProp="w-44 h-full text-black border-r"
                    defaultText="All Categories"
                    data={category}
                    truncate="truncate flex-1 min-w-0"
                  />
                  <input
                    type="text"
                    placeholder="Search Products"
                    className="outline-none h-full px-4 text-lg w-full"
                    maxLength={36}
                  />
          
                  <button className="flex items-center justify-center h-full px-3 cursor-pointer bg-black">
                    <img
                      src={SearchImg}
                      alt="Search Icon"
                      className="h-9 w-9 object-contain invert"
                    />
                  </button>
                </div>
              </div>
              <div className="flex gap-6 items-center">
              <div className="relative">
                  <Link to={'/cart-details'}>   
                <img
                  src={ShoppingBagImg}
                  alt="Shopping Bag"
                  className="h-9 w-9 0bject-contain"
                />
                </Link>
                {cartItems.length === 0 ? "" : (<div className="absolute -top-2 -right-2 bg-red-600 h-6 w-6 flex items-center justify-center rounded-full text-sm text-white">{cartItems.length}</div>)}
              </div>
                <button onClick={() => {setLoginModal(true)}} className="w-28 h-11 border uppercase tracking-wider bg-black text-white cursor-pointer">
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Third Navbar */}
        <div className="bg-gray-100 border-t-2 border-gray-400 w-full">
          <div className="max-w-7xl mx-auto py-4 px-6 md:px-12 hidden md:grid grid-cols-[auto_1fr] gap-24">
            <div
              className="flex items-center relative"
              onMouseEnter={() => setCategoryMenu(true)}
              onMouseLeave={() => {
                setCategoryMenu(false);
                setSubcategory(null);
              }}
            >
              <button className="h-13 w-fit px-4 flex items-center gap-2 tracking-wider uppercase cursor-pointer bg-black text-white">
                <img
                  src={MenuImg}
                  alt="Menu Icon"
                  className="h-8 w-8 object-contain invert"
                />{" "}
                Shop By Categories
              </button>
              <div className="absolute top-full left-0 h-3 w-full " />
              {categoryMenu && (
                <ul className="absolute top-full mt-1 left-0 w-full h-fit bg-gray-100 z-100">
                  {category.map((item) => (
                    <li
                      key={item.id}
                      className="px-6 hover:bg-gray-200 cursor-pointer"
                      onMouseEnter={() => setSubcategory(item.id)}
                      onMouseLeave={() => setSubcategory(null)}
                    >
                      {item.subCategory ? (
                        <SubcategoryMenu
                          value={item.value}
                          subcategory={subcategory}
                          id={item.id}
                          data={item.subCategory}
                          setSubcategory={setSubcategory}
                        />
                      ) : (
                        <div className="py-3">
                          <a href="#" target="blank">
                            {item.value}
                          </a>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <ul className="flex items-center gap-12 text-lg">
              <li>
                <Link to={'/'}>Home</Link>
              </li>
              <li>
                <Link to={'/all-products'} >All Products</Link>
              </li>
              <li>
                <Link to={'/selected-category/best-sellers'}>Best Sellers</Link>
              </li>
              <li>
                <Link to={'/selected-category/back-in-stock'} >Back In Stock</Link>
              </li>
              <li>
                <Link to={'/selected-category/new-arrivals'}>New Arrivals</Link>
              </li>
            </ul>
          </div>
        </div>
        {/* Mobile Navbar */}
        <div className="md:hidden bg-gray-100 px-6 py-3 flex justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => setMobileOpen(true)}>
              <img
                src={MenuImg}
                alt="Menu Icon"
                className="h-8 w-8 object-contain"
              />
            </button>
            <Link to={'/'}>
             <h2 className="text-2xl font-bold tracking-wide">
              <span className="text-3xl">M</span>egastore
            </h2>
            </Link>

          </div>
          <Link to={'/cart-details'}>
          <button className="flex items-center justify-center">
            <img
              src={ShoppingBagImg}
              alt="Shopping Bag"
              className="h-8 w-8 object-contain"
            />
          </button></Link>
          
        </div>
      </nav>
      {mobileOpen && <aside></aside>}
    </>
  );
}

export default Navbar;

function DropdownMenu({
  dropdown,
  setDropdown,
  id,
  data,
  defaultText,
  customProp,
  invert,
  truncate,
}) {
  const [buttonText, setButtonText] = useState("");
  return (
    <div className="relative">
      <button
        onClick={() => setDropdown((prev) => (prev === id ? null : id))}
        className={`flex items-center gap-3 cursor-pointer ${customProp} px-4 group overflow-hidden`}
      >
        <span className={truncate}>
          {buttonText ? buttonText : defaultText}{" "}
        </span>
        <img
          src={DropdownIcon}
          alt="Dropdown button icon"
          className={`h-5 w-5 ${invert} object-contain transition-transform duration-300 ease-in-out group-hover:rotate-180 ${dropdown === id ? "rotate-180" : "rotate-0"}`}
        />{" "}
      </button>
      {dropdown === id && (
        <ul className="absolute mt-1 top-full left-0 bg-gray-200 z-100 h-fit w-full">
          {data.map((item) => (
            <li
              key={item.id}
              className="px-4 py-2  cursor-pointer duration-150 transition-colors ease-in-out hover:bg-gray-400"
              onClick={() => {
                setButtonText(item.value);
                setDropdown(null);
              }}
            >
              {item.value}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function SubcategoryMenu({ value, subcategory, id, data }) {
  return (
    <div className="relative py-3">
      <button className="flex items-center justify-between w-full cursor-pointer">
        {value}{" "}
        <img
          src={NextImg}
          alt="next icon"
          className="h-5 w-5 object-contain"
        />{" "}
      </button>{" "}
      {subcategory === id && (
        <ul className="absolute top-0 left-full bg-gray-200 shadow-sm w-60 ml-6">
          {data.map((item) => (
            <li key={item.id} className="px-3 py-3 hover:bg-gray-300">
              {item.value}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
