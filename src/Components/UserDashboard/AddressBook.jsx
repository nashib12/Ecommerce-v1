import React from "react";
import PlusImg from '../../../public/Icons/plus.png'

function AddressBook() {
  return (
    <div>
      <h2 className="font-semibold tracking-wide text-2xl mb-6">
        Address Book
      </h2>
      <table className="mb-6">
        <thead className="h-12 tracking-wider border-y font-semibold">
          <tr>
            <td className="border-x px-2">Full Name</td>
            <td className="border-r px-2">Address</td>
            <td className="border-r px-2">Billing Address</td>
            <td className="border-r px-2">Phone Number</td>
            <td className="border-r px-2">Action</td>
          </tr>
        </thead>
        <tbody className="h-22">
          <tr className="border-b">
            <td className="border-x px-2">Tester tester</td>
            <td className="border-r px-2">Lamjung, Nepal</td>
            <td className="border-r px-2">Doodhpokhari R.M., Lamjung, Nepal</td>
            <td className="border-r px-2">+977 980-0000000</td>
            <td className="border-r px-2"><button className='bg-[#1A9CB7] text-white h-10 w-24 cursor-pointer tracking-wider border-2 uppercase border-[#1A9CB7] transition-colors duration-300 ease-in-out hover:bg-white hover:text-black'>Edit</button></td>
          </tr>
        </tbody>
      </table>
      <div className="flex justify-end">
        <button className='bg-[#1A9CB7] text-white h-12 w-50 cursor-pointer tracking-wider border-2 border-[#1A9CB7] transition-colors duration-300 ease-in-out hover:bg-white hover:text-black flex items-center justify-center gap-2 group'><img src={PlusImg} alt="plus icon" className="transition-all duration-300 ease-in-out invert group-hover:invert-0 h-4 w-4 object-contain" />Add new Address</button>
      </div>
    </div>
  );
}

export default AddressBook;
