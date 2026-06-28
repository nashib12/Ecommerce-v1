import React, {
  createContext,
  useEffect,
  useState,
} from "react";
import Loader from "../Components/Loader";
import { useQuery } from "@tanstack/react-query";
import api from "../lib/axios";

const DataContext = createContext();

export function ContextProvider({ children }) {
  const [trendingWeek, setTrendingWeek] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [loginModal, setLoginModal] = useState(false);
  const [passwordEdit, setPasswordEdit] = useState(false);
  const [addCategory, setAddCategory] = useState(false);
  const [addProduct, setAddProduct] = useState(false);
  const [ updateData, setUpdateData ] = useState(null);
  const [ modal, setModal ] = useState('');
  const [ newsLetterModal, setNewsLetterModal ] = useState(false);

  const { data : category = [] , isPending: categoryPending} = useQuery({
    queryKey : ['categories'],
    queryFn: () => api.get('/category').then(response => response.data.data),
  });

  const { data : product = [], isPending: productPending } = useQuery({
    queryKey: ['products'],
    queryFn: () => api.get('/product').then(response => response.data.data.data),
  });

  const { data: deliveryFee = '', isPending: deliveryFeePending } = useQuery({
    queryKey: ['deliveryFee'],
    queryFn: () => api.get('/shipping_fee').then(response => response.data.data),
  });

  const { data: attribute = [], isPending: attributePending } = useQuery({
    queryKey: ['attribute'],
    queryFn : () => api.get('/attributeValue').then(response => response.data.data),
  });

  const { data: featuredProduct = [], isPending: featuredProductPending } = useQuery({
    queryKey: ['products', 'featured'],
    queryFn : () => api.get('/featured_product').then(response => response.data.data.data),
  });

  useEffect(() => {
    async function getTrending() {
      const response = await fetch("/Data/TrendingData.json");
      const data = await response.json();
      setTrendingWeek(data);
    }
    getTrending();
  }, []);

  const loading = categoryPending || productPending || deliveryFeePending || attributePending || featuredProductPending;
  
  if (loading ) {
    return <Loader />;
  }

  return (
    <DataContext.Provider
      value={{
        category,
        trendingWeek,
        featuredProduct,
        openModal,
        setOpenModal,
        loginModal,
        setLoginModal,
        passwordEdit,
        setPasswordEdit,
        addCategory,
        setAddCategory,
        addProduct,
        setAddProduct,
        product, deliveryFee, attribute, updateData, setUpdateData,
        modal, setModal, newsLetterModal, setNewsLetterModal,
      }}
    >
      {" "}
      {children}{" "}
    </DataContext.Provider>
  );
}

export default DataContext;
