import React, {
  createContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";

const DataContext = createContext();

const initialState = {
  quantity: 1,
  deliveryCharge: 10,
  productColor: "",
  productSize: "",
  cartItems: [],
  wishList: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "products/addItem":
      return { ...state, quantity: state.quantity + 1 };
    case "products/removeItem":
      return {
        ...state,
        quantity: state.quantity > 0 ? state.quantity - 1 : state.quantity,
      };
    case "products/clearItem":
      console.log("button clicked");
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item.productId !== action.payload,
        ),
      };
    case "products/setColor":
      return { ...state, productColor: action.payload };
    case "products/setSize":
      return { ...state, productSize: action.payload };
    case "products/addToCart": {
      const productExist = state.cartItems.find(
        (item) => item.productId === action.payload.productId,
      );
      if (productExist) {
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item.productId === action.payload.productId
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item,
          ),
          quantity: 1,
          productColor: "",
          productSize: "",
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, action.payload],
          quantity: 1,
          productColor: "",
          productSize: "",
        };
      }
    }
    case "carts/addItem":
      return {
        ...state,
        cartItems: state.cartItems.map((item) => {
          if (item.productId === action.payload) {
            const newQuantity = item.quantity + 1;
            return {
              ...item,
              quantity: newQuantity,
              subTotal: newQuantity * item.productPrice,
            };
          }
          return item;
        }),
      };
    case "carts/removeItem":
      return {
        ...state,
        cartItems: state.cartItems.map((item) => {
          if (item.productId === action.payload) {
            const newQuantity =
              item.quantity === 0 ? item.quantity : item.quantity - 1;
            return {
              ...item,
              quantity: newQuantity,
              subTotal: newQuantity * item.productPrice,
            };
          }
          return item;
        }),
      };
    default:
      return state;
  }
};

export function ContextProvider({ children }) {
  const [category, setCategory] = useState([]);
  const [popularCategory, setPopularCategory] = useState([]);
  const [trendingWeek, setTrendingWeek] = useState([]);
  const [weeklyData, setWeeklyData] = useState([]);
  const [featuredProduct, setFeaturedProduct] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [
    { quantity, deliveryCharge, cartItems, productColor, productSize, wishList },
    dispatch,
  ] = useReducer(reducer, initialState);
  const [loginModal, setLoginModal] = useState(false);
  const [profileEdit, setProfileEdit] = useState(false);
  const [passwordEdit, setPasswordEdit] = useState(false);
  const [ addCategory, setAddCategory] = useState(false);
  const [ addProduct, setAddProduct ] = useState(false);

  const subTotal = useMemo(() => {
    return cartItems.reduce((total, items) => total + items.subTotal, 0);
  }, [cartItems]);

  const total = useMemo(() => {
    return subTotal + deliveryCharge;
  }, [subTotal, deliveryCharge]);

  useEffect(() => {
    async function getCategory() {
      try {
        const response = await fetch("/Data/Category.json");
        const data = await response.json();
        setCategory(data);
      } catch (error) {
        console.log(error);
      }
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

  useEffect(() => {
    async function getWeeklyData() {
      try {
        const response = await fetch("/Data/WeeklyData.json");
        const data = await response.json();
        setWeeklyData(data);
      } catch (error) {
        console.log(error);
      }
    }
    getWeeklyData();
  }, []);

  useEffect(() => {
    async function getFeaturedData() {
      try {
        const response = await fetch("/Data/FeaturedProduct.json");
        const data = await response.json();
        setFeaturedProduct(data);
      } catch (error) {
        console.log(error);
      }
    }
    getFeaturedData();
  }, []);

  return (
    <DataContext.Provider
      value={{
        category,
        popularCategory,
        trendingWeek,
        weeklyData,
        featuredProduct,
        openModal,
        setOpenModal,
        quantity,
        deliveryCharge,
        total,
        dispatch,
        cartItems,
        productColor,
        productSize,
        subTotal,
        loginModal,
        setLoginModal,
        wishList,profileEdit, setProfileEdit, passwordEdit, setPasswordEdit, addCategory, setAddCategory,
        addProduct, setAddProduct,
      }}
    >
      {" "}
      {children}{" "}
    </DataContext.Provider>
  );
}

export default DataContext;
