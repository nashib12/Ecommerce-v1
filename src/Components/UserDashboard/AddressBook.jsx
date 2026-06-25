import React, { useContext } from "react";
import PlusImg from '../../../public/Icons/plus.png'
import DataContext from "../../Context/DataContext";
import { useAuth } from "../../Context/AuthContext";

function AddressBook() {
  const { setUpdateData, setModal } = useContext(DataContext);
  const { address, user } = useAuth();
  if(!user) return;
  return (
    <>
    <div className="hidden md:block">
      <h2 className="font-semibold tracking-wide text-2xl mb-6">
        Address Book
      </h2>
      <table className="mb-6 table-auto border-collapse w-full">
        <thead className="h-18 py-2 tracking-wider bg-gray-200">
          <tr className="text-left">
            <th className="px-2">S.N.</th>
            <th className="px-2">Address Label</th>
            <th className="px-2">Billing Address</th>
            <th className="px-2">Contact no.</th>
            <th className="px-2">Status</th>
            <th className="px-2">Action</th>
          </tr>
        </thead>
        <tbody className="h-22">
          {address.map((item, index) => (
            <tr key={`ADD-ID-${item.id}`} className="border-b transition-colors duration-200 ease-in-out hover:bg-gray-100 cursor-pointer">
              <td className="font-semibold px-2">{ index + 1}</td>
              <td className="px-2">{ item.label }</td>
              <td  className="px-2">{ item.address_line}</td>
              <td  className="px-2">{ item.phone} </td>
              <td className="px-2">{ item.is_default ? 'Default' : 'Regular'}</td>
              <td className="px-2" >
                <button onClick={() => {setUpdateData(item); setModal('address')}} className='bg-[#1A9CB7] text-white h-10 w-24 cursor-pointer tracking-wider border-2 uppercase border-[#1A9CB7] transition-colors duration-300 ease-in-out hover:bg-white hover:text-black'>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-end">
        <button onClick={() => setModal('address')} className='bg-[#1A9CB7] text-white h-12 w-50 cursor-pointer tracking-wider border-2 border-[#1A9CB7] transition-colors duration-300 ease-in-out hover:bg-white hover:text-black flex items-center justify-center gap-2 group'><img src={PlusImg} alt="plus icon" className="transition-all duration-300 ease-in-out invert group-hover:invert-0 h-4 w-4 object-contain" />Add new Address</button>
      </div>
    </div>
    </>
  );
}

export default AddressBook;
