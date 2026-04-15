import ReactLenis from "lenis/react";
import "./App.css";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { ContextProvider } from "./Context/DataContext";
import Home from "./Pages/Home";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import ProductDetails from "./Pages/ProductDetails";
import ProductModal from "./Components/Modal/ProductModal";
import Cart from "./Components/Products/Cart";
import Product from "./Pages/Product";
import LoginModal from "./Components/Modal/LoginModal";
import Authentication from "./Pages/Authentication";
import Registeration from "./Components/Authentication/Registeration";
import UserLogin from "./Components/Authentication/UserLogin";
import AboutUs from "./Pages/AboutUs";
import ContactUs from "./Pages/ContactUs";
import UserDashboard from "./Pages/Dashboard/UserDashboard";
import ProfileEditModal from "./Components/Modal/ProfileEditModal";
import ChangePasswordModal from "./Components/Modal/ChangePasswordModal";
import Checkout from "./Pages/Checkout";
import AdminDashboard from "./Pages/Dashboard/AdminDashboard";
import AdminLogin from "./Components/AdminDashboard/AdminLogin";
import AddCategory from "./Components/Modal/AddCategory";
import AddProduct from "./Components/Modal/AddProduct";
import AddressModal from "./Components/Modal/AddressModal";

function App() {
  return (
    <ContextProvider>
      <ReactLenis root options={{ duration: 1.3, smoothWheel: true }}>
        <BrowserRouter>
          <Layout />
        </BrowserRouter>
      </ReactLenis>
    </ContextProvider>
  );
}

export default App;

function Layout() {
  const location = useLocation();
  const setLayout = location.pathname.includes("/authentication");
  return (
    <>
      {!setLayout ? (
        <>
          {" "}
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product-details/:slug" element={<ProductDetails />} />
            <Route path="/cart-details" element={<Cart />} />
            <Route path="/all-products" element={<Product />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/my-account" element={<UserDashboard />} />
            <Route path="/check-out" element={<Checkout />} />
          </Routes>
          <Footer />
          <ProductModal />
          <LoginModal />
          <ProfileEditModal />
          <ChangePasswordModal />
          <AddressModal />
        </>
      ) : (
        <>
          <Routes>
            <Route path="/authentication" element={<Authentication />}>
              <Route path="user-registration" element={<Registeration />} />
              <Route path="user-login" element={<UserLogin />} />
            </Route>
            <Route
              path="/authentication/admin/dashboard"
              element={<AdminDashboard />}
            />
            <Route
              path="/authentication/admin-login"
              element={<AdminLogin />}
            />
          </Routes>
          <AddCategory />
          <AddProduct />
        </>
      )}
    </>
  );
}
