import axios from "axios";
import React, {
  createContext,
  useEffect,
  useState,
} from "react";
import Loader from "../Components/Loader";

const DataContext = createContext();

export function ContextProvider({ children }) {
  const [category, setCategory] = useState([]);
  const [popularCategory, setPopularCategory] = useState([]);
  const [trendingWeek, setTrendingWeek] = useState([]);
  const [featuredProduct, setFeaturedProduct] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [loginModal, setLoginModal] = useState(false);
  const [profileEdit, setProfileEdit] = useState(false);
  const [passwordEdit, setPasswordEdit] = useState(false);
  const [addCategory, setAddCategory] = useState(false);
  const [addProduct, setAddProduct] = useState(false);
  const [updateAddress, setUpdateAddress] = useState(false);
  const [ product, setPoduct ] = useState([]);
  const [ deliveryFee, setDeliveryFee ] = useState('');
  const [ attribute, setAttribute ] = useState([]);
  const [ loading, setLoading ] = useState(false);

  useEffect(() => {
    async function getCategory() {
      setLoading(true);
      try {
        const response = await Promise.allSettled([
          axios.get('http://127.0.0.1:8000/api/category'),
          axios.get('http://127.0.0.1:8000/api/product'),
          axios.get('http://127.0.0.1:8000/api/shipping_fee'),
          axios.get('http://127.0.0.1:8000/api/attributeValue'),
          axios.get('http://127.0.0.1:8000/api/featured_product'),
        ]);
        const [ categoryRes, productRes, shippingFeeRes, attributeRes, featuredRes ] = response;
        if( categoryRes.status === 'fulfilled' ) setCategory(categoryRes.value.data.data);
        if (productRes.status === 'fulfilled' ) setPoduct(productRes.value.data.data.data);
        if (shippingFeeRes.status === 'fulfilled') setDeliveryFee(shippingFeeRes.value.data.data);
        if (attributeRes.status === 'fulfilled') setAttribute(attributeRes.value.data.data);
        if (featuredRes.status === 'fulfilled') setFeaturedProduct(featuredRes.value.data.data.data);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    }
    getCategory();
  }, []);

  useEffect(() => {
    async function getPopularCategory() {
      try {
        const response = await fetch("/Data/PopularCategory.json");
        const data = await response.json();
        setPopularCategory(data);
      } catch (error) {
        console.log(error);
      }
    }
    getPopularCategory();
  }, []);

  useEffect(() => {
    async function getTrending() {
      const response = await fetch("/Data/TrendingData.json");
      const data = await response.json();
      setTrendingWeek(data);
    }
    getTrending();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <DataContext.Provider
      value={{
        category,
        popularCategory,
        trendingWeek,
        featuredProduct,
        openModal,
        setOpenModal,
        loginModal,
        setLoginModal,
        profileEdit,
        setProfileEdit,
        passwordEdit,
        setPasswordEdit,
        addCategory,
        setAddCategory,
        addProduct,
        setAddProduct,
        updateAddress,
        setUpdateAddress,
        product, deliveryFee, attribute
      }}
    >
      {" "}
      {children}{" "}
    </DataContext.Provider>
  );
}

export default DataContext;
