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
import { Link, Navigate, useLocation } from "react-router-dom";
import { useLenis } from "lenis/react";
import CartContext from "../Context/CartContext";
import PlusIcon from '../../public/Icons/plus.png';
import { useAuth } from "../Context/AuthContext";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";

function Navbar() {
  const { user, logout } = useAuth();
  const [dropdown, setDropdown] = useState(false);
  const [categoryMenu, setCategoryMenu] = useState(false);
  const [subcategory, setSubcategory] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileDropdown, setMobileDropdown] = useState('');
  const [ childDropdown, setChildDropdown ] = useState('');

  const { category, setLoginModal } = useContext(DataContext);
  const { cartItems } = useContext(CartContext);
  const location = useLocation();
  const lenis = useLenis();
  const { handleSubmit } = useForm();
  const queryClient = useQueryClient();

  useEffect(() => {
    lenis?.scrollTo(0);
  }, [location]);

  const onSubmit = async () => {
    try {
      await logout();
      queryClient.clear();
      toast.success("Successfully log out.");
      return <Navigate to={'/'} replace />
    } catch (error) {
      toast.error(error.response?.data.message || "Something went wrong. Try again.")
    }
  }

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
                {cartItems.length === 0 ? "" : (<div className="absolute -top-2 -right-2 bg-red-600 h-6 w-6 flex items-center justify-center rounded-full text-sm text-white">{Object.values(cartItems).reduce(( sum, item) => sum + item.quantity, 0)}</div>)}
              </div>
              { user ? (
                <form onSubmit={handleSubmit(onSubmit)}>
                  <button type='submit' className="w-28 h-11 border uppercase tracking-wider bg-black text-white cursor-pointer">
                    Logout
                  </button>
                </form>
              ) : (
                <button onClick={() => {setLoginModal(true)}} className="w-28 h-11 border uppercase tracking-wider bg-black text-white cursor-pointer">
                  Login
                </button>
              )}
              </div>
            </div>
          </div>
        </div>
        {/* Third Navbar */}
        <div className="bg-gray-100 border-t-2 border-gray-400 w-full">
          <div className="max-w-7xl mx-auto py-4 px-6 md:px-12 hidden md:grid grid-cols-[auto_1fr] gap-24">
            <div className="flex items-center relative">
              <button onClick={() => {setCategoryMenu(curr => !curr); setSubcategory('')}} className="h-13 w-fit px-4 flex items-center gap-2 tracking-wider uppercase cursor-pointer bg-black text-white">
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
                      onClick={() => setSubcategory(curr => curr === item.id ? '' : item.id)}
                    >
                      {item.children.length !== 0 ? (
                        <SubcategoryMenu
                          value={item.title}
                          subcategory={subcategory}
                          id={item.id}
                          data={item.children}
                          setCategoryMenu={setCategoryMenu}
                        />
                      ) : (
                        <p className="py-3">{item.title}</p>
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
                <Link to={'/all_products/catalog'} >All Products</Link>
              </li>
              <li>
                <Link to={'/all_products/1'}>For Him</Link>
              </li>
              <li>
                <Link to={'/all_products/2'} >For Her</Link>
              </li>
              <li>
                <Link to={'/all_products/3'}>Kids</Link>
              </li>
              <li>
                <Link to={'/all_products/featured'}>Featured</Link>
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
      <aside className={`md:hidden fixed top-0 bottom-0 left-0 bg-white w-60 z-995 transform transition-all duration-500 ease-in-out ${mobileOpen ? 'translate-x-0' : '-translate-x-100'} overflow-y-scroll`}>
          <div className="px-4 pt-6 pb-3 flex items-center justify-between">
            <h2 className="font-bold text-2xl tracking-wider">
                  <span className="text-4xl">M</span>egastore
            </h2>  
            <button className="h-fit w-fit px-2 py-1 text-xs rounded border" onClick={() => setMobileOpen(false)}>Close</button>
          </div>
          <div className="h-0.5 w-full rounded-full bg-black"  /> 
            <ul className="px-4 py-6">
              {category.map(item => {
                const hasParent = item.parent_id;
                if (!hasParent) {
                  return (
                    <>
                  <li key={`CAT_MOB_${item.id}`} className="py-2">
                    <div className="w-full">
                      <div onClick={() => setMobileDropdown(curr => curr === item.title ? '' : item.title)} className="text-lg flex items-center justify-between">
                        {item.title}
                        <img src={PlusIcon} alt="plus button icon" className="h-3 w-3 object-contain" />
                      </div>
                      { mobileDropdown === item.title && <ul className="ml-1.5 h-fit mt-2 text-md">
                          {item.children.map(child => (
                            <li key={`CAT_CHILD_${child.id}`} className="py-2">
                              <div onClick={() => setChildDropdown(curr => curr === child.title ? '' : child.title)} className="text-lg flex items-center justify-between">
                                {child.title}
                                <img src={PlusIcon} alt="plus button icon" className="h-3 w-3 object-contain" />
                              </div>
                              { childDropdown === child.title && <ul className="mt-1.5 ml-1.5 h-fit">
                                  {child.children.map(i => (
                                    <Link key={`CHILD_SUB_${i.id}`} to={`/selected_category/${i.id}`} onClick={() => {
                                      setMobileDropdown(''); setChildDropdown(''); setMobileOpen(false);
                                    }}>
                                        <li className="py-1.5 text-sm">{ i.title}</li>
                                    </Link>
                                  ))}
                                </ul>}
                            </li>
                          ))}
                        </ul>}
                    </div>
                  </li>
                  </>
                  )
                }
              })}
            </ul>
      </aside>
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
                setButtonText(item.title);
                setDropdown(null);
              }}
            >
              {item.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function SubcategoryMenu({ value, subcategory, id, data, setCategoryMenu }) {
    const [childDropdown, setChildDropdown ] = useState('');
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
            <li key={item.id} className="px-3 hover:bg-gray-300">
              { item.children.length > 0 ? (
                <div className="relative" onMouseEnter={() => setChildDropdown(item.id)} onMouseLeave={() => setChildDropdown('')}>
                  <div className="flex items-center justify-between cursor-pointer py-3 " >
                    { item.title }
                    <img src={NextImg} className="h-4 w-4 object-contain" />
                  </div>
                  { childDropdown === item.id && (
                    <>
                      <div className="absolute top-0 left-full w-6 h-full" />
                      <ul className="absolute top-0 left-full bg-gray-100 w-60 ml-3.5">
                        { item.children.map(i => (
                          <Link to={`/selected_category/${i.slug}`} onClick={() => setCategoryMenu('')}>
                            <li key={`sub-cat-${i.id}`} className="px-3 py-3 hover:bg-gray-300" >{i.title}</li>
                          </Link>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              ) : 
                <p className="py-3 hover:bg-gray-300">{item.title}</p>
                
              }
            </li>
          ) //Data mapping ends here
          )}
        </ul>
      )}
    </div>
  );
}
