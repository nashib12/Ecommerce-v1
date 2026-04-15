import React, { useContext } from "react";
import PlusImg from '../../../public/Icons/plus.png'
import DataContext from "../../Context/DataContext";

function AddressBook() {
  const { setUpdateAddress } = useContext(DataContext);
  return (
    <>
    <div className="hidden md:block">
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
        <button onClick={() => setUpdateAddress(true)} className='bg-[#1A9CB7] text-white h-12 w-50 cursor-pointer tracking-wider border-2 border-[#1A9CB7] transition-colors duration-300 ease-in-out hover:bg-white hover:text-black flex items-center justify-center gap-2 group'><img src={PlusImg} alt="plus icon" className="transition-all duration-300 ease-in-out invert group-hover:invert-0 h-4 w-4 object-contain" />Add new Address</button>
      </div>
    </div>
    <div className="md:hidden flex flex-col gap-3 pt-3">
      <div className="w-full px-4 rounded-sm py-2 bg-gray-500 text-white h-fit">
          <p className="font-semibold mb-2 text-lg">Full Address</p>
          <p className="text-sm">Doohpokhari R.M. -5, Lamjung, Gandaki Province, Nepal</p>
      </div>
      <div className="w-full px-4 rounded-sm py-2 bg-gray-500 text-white h-fit">
          <p className="font-semibold mb-2 text-lg">Billing Address</p>
          <p className="text-sm">Doohpokhari R.M. -5, Lamjung, Gandaki Province, Nepal</p>
      </div>
      <div className="w-full px-4 rounded-sm py-2 bg-gray-500 text-white h-fit">
          <p className="font-semibold mb-2 text-lg">Phone Number</p>
          <p className="text-sm">+977 980-0000000</p>
      </div>
      <button className='bg-[#1A9CB7] text-white h-11 w-full flex items-center justify-center gap-4 rounded-sm'>Edit Address</button>
      <button onClick={() => setUpdateAddress(true)} className='bg-[#1A9CB7] text-white h-11 w-full flex items-center justify-center gap-4 rounded-sm'><img src={PlusImg} alt="plus icon" className="invert h-4 w-4 object-contain" />Add new Address</button>
    </div>
    </>
  );
}

export default AddressBook;
