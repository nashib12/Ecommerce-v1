import React, { useState } from "react";
import DownIcon from "../../../public/Icons/down-chevron.png";
import RightArrowIcon from "../../../public/Icons/arrow.png";
import LeftArrowIcon from "../../../public/Icons/right-arrow.png";
import ProductImg1 from "../../../public/Images/ProductImg/card1.webp";

function BestProduct() {
  const array = [1, 2, 3, 4, 5];
  const [dropdown, setDropdown] = useState(false);
  const sortArray = ["Today", "Last 7 Days", "Last 15 Days", "This Month", "Last Month"];
  const reportArray = ["Report", "Downlaod Report", "Export as CSV"];
  return (
    <section
      id="best-product"
      className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-2 gap-6"
    >
      {/* best selling product table */}
      <div className="flex flex-col bg-white border-2 border-gray-200 rounded-md">
        <div className="flex items-center justify-between px-4 pt-8 pb-4 border-b-2 border-gray-200">
          <h3 className="text-lg font-semibold tracking-wider">
            Best Selling Products
          </h3>
          <div className="flex gap-3">
            <span>Sort By:</span>
            <DropdownMenu
              dropdown={dropdown}
              setDropdown={setDropdown}
              id="sorting"
              data={sortArray}
            />
          </div>
        </div>
        {array.map((item) => (
          <div key={item}>
            <div className="px-4 py-4 grid grid-cols-8 gap-4 border-b-2 border-gray-200">
              <img
                src={ProductImg1}
                alt="product image"
                className="h-16 w-16 object-cover"
              />
              <div className="col-span-3">
                <div className="flex flex-col gap-0.5 justify-center">
                  <h4 className="font-semibold text-lg">Branded T-shirts</h4>
                  <p className="text-sm">9 April, 2026</p>
                </div>
              </div>
              <div className="flex flex-col gap-0.5 justify-center items-center">
                <h4 className="font-semibold text-lg">$29.00</h4>
                <p className="text-sm">Price</p>
              </div>
              <div className="flex flex-col gap-0.5 justify-center items-center">
                <h4 className="font-semibold text-lg">62</h4>
                <p className="text-sm">Orders</p>
              </div>
              <div className="flex flex-col gap-0.5 justify-center items-center">
                {item % 2 === 0 ? (
                  <div className="text-[7px] px-1 py-1 bg-red-400 rounded-full text-center text-white">
                    Out of Stock
                  </div>
                ) : (
                  <h4 className="font-semibold text-lg">510</h4>
                )}
                <p className="text-sm">Stock</p>
              </div>
              <div className="flex flex-col gap-0.5 justify-center items-center">
                <h4 className="font-semibold text-lg">$1798</h4>
                <p className="text-sm">Amount</p>
              </div>
            </div>
          </div>
        ))}
        <div className="flex justify-between px-4 py-6">
          <p>Showing 5 of 250 products</p>
          <div className="flex gap-2 items-center">
            <button className="flex items-center justify-center h-8 w-8 border rounded-xs cursor-pointer">
              <img
                src={RightArrowIcon}
                alt="right arrow iscon"
                className="h-4 w-4 object-contain"
              />
            </button>
            {array.map((item) => (
              <button
                key={item}
                className="flex items-center justify-center h-8 w-8 border rounded-xs cursor-pointer"
              >
                {item}
              </button>
            ))}
            <button className="flex items-center justify-center h-8 w-8 border rounded-xs cursor-pointer">
              <img
                src={LeftArrowIcon}
                alt="left arrow icon"
                className="h-4 w-4 object-contain"
              />
            </button>
          </div>
        </div>
      </div>
      {/* best selling categsory */}
      <div className="flex flex-col bg-white border-2 border-gray-200 rounded-md h-fit">
            <div className="flex items-center justify-between border-b-2 border-gray-200 px-4 pt-8 pb-4">
              <h2 className="text-lg font-semibold tracking-wide">Top Categories</h2>
              <DropdownMenu dropdown={dropdown} setDropdown={setDropdown} id="report" data={reportArray} />
            </div>
            <div className="px-4 py-8">
              <table className="border rounded-sm table-auto w-full">
                  <thead className="h-14 border">
                      <tr>
                        <th className="border-l">S.N.</th>
                        <th className="border-l">Category</th>
                        <th className="border-l">Total Products</th>
                        <th className="border-l">Stock Level</th>
                        <th className="border-l">Total Order</th>
                      </tr>
                  </thead>
                  <tbody className="border">
                    {array.map(item => (    
                      <tr key={item} className="h-12 text-center text-lg border-b">
                          <td className="border-r">{item}</td>
                          <td className="border-r">Watches</td>
                          <td className="border-r">{15 - item}</td>
                          <td className="border-r">{(1000 / item).toFixed(0)}</td>
                          <td className="border-r">{ 120 - item * item}</td>
                      </tr>
                    ))}
                  </tbody>
              </table>
                 <div className="flex justify-between px-4 pt-8">
          <p>Showing 5 of 50 category</p>
          <div className="flex gap-2 items-center">
            <button className="flex items-center justify-center h-8 w-8 border rounded-xs cursor-pointer">
              <img
                src={RightArrowIcon}
                alt="right arrow iscon"
                className="h-4 w-4 object-contain"
              />
            </button>
            {array.map((item) => (
              <button
                key={item}
                className="flex items-center justify-center h-8 w-8 border rounded-xs cursor-pointer"
              >
                {item}
              </button>
            ))}
            <button className="flex items-center justify-center h-8 w-8 border rounded-xs cursor-pointer">
              <img
                src={LeftArrowIcon}
                alt="left arrow icon"
                className="h-4 w-4 object-contain"
              />
            </button>
          </div>
        </div>
            </div>
      </div>
    </section>
  );
}

export default BestProduct;

function DropdownMenu({ dropdown, setDropdown, id, data }) {
    const [option, setOption] = useState(data[0]);
  return (
    <div className="relative">
      <button
        onClick={() => setDropdown((curr) => (curr === id ? null : id))}
        className="flex items-center gap-1 cursor-pointer"
      >
        {option}
        <img
          src={DownIcon}
          alt="down chevron icon"
          className="h-5 w-5 object-contain"
        />
      </button>
      {dropdown === id && (
        <ul className="absolute top-full right-0 mt-1 bg-gray-200 border-2 rounded-sm border-gray-200 h-fit w-36">
            {data.map((item, index) => (
                <li key={index} className="cursor-pointer px-3 py-3 hover:bg-gray-100 font-[14px]" onClick={() => {setOption(item); setDropdown(null)}}>{item}</li>
            ))}
        </ul>
      )}
    </div>
  );
}
