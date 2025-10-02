import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import SignUpScreen from "./screens/SignUpScreen";
import LoginScreen from "./screens/LoginScreen";
import CartScreen from "./screens/CartScreen";
import ProductDetails from "./screens/ProductDetails";
import ProductsScreen from "./screens/ProductsScreen";
import CategoryNav from "./components/CategoryNav";
import WishlistScreen from "./screens/WishlistScreen";
import CategoryProductsScreen from "./screens/CategoryProductScreen";
import ProfileScreen from "./screens/ProfileScreen";
import OrderScreen from "./screens/OrderScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrdersScreen from "./screens/OrdersScreen";
import ScrollToTopButton from "./components/ScrollToTopButton";
import OurStory from "./components/OurStory";
import Contact from "./components/Contact";
import ReviewsPage from "./components/ReviewsPage";
import Terms from "./components/Term&Conditions";
import PrivacyPolicy from "./components/PrivacyPolicy";
import ReturnPolicy from "./components/ReturnPolicy";
import { useAutoLogout } from "./hooks/useAutoLogout";

function App() {
  useAutoLogout();
  return (
    <>
      <Header />
      
      <div style={{ minHeight: "90vh" }}>
        <Routes>
          <Route path="/home" element={<HomeScreen />} />
          <Route path="/" element={<HomeScreen />} />
          <Route path="/login" element={<LoginScreen />}></Route>
          <Route path="/signup" element={<SignUpScreen />}></Route>
          <Route path="/cart/:id?" element={<CartScreen />}></Route>
          <Route path="/orders/" element={<OrdersScreen />} />
          <Route path="/order/:id" element={<OrderScreen />}></Route>
          <Route path="/wishlist" element={<WishlistScreen />}></Route>
          <Route path="/product/:id" element={<ProductDetails />}></Route>
          <Route path="/products/" element={<ProductsScreen />}></Route>
          <Route path="/shipping" element={<ShippingScreen />} />
          <Route path="/payment" element={<PaymentScreen />} />
          <Route path="/placeorder" element={<PlaceOrderScreen />} />
          <Route
            path="/category/:categoryName"
            element={<CategoryProductsScreen />}
          />
          <Route path="/profile" element={<ProfileScreen />} />
          <Route path="/ourstory" element={<OurStory />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/reviews" element={<ReviewsPage />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/prPolicy" element={<PrivacyPolicy />} />
          <Route path="/returnPolicy" element={<ReturnPolicy />} />
        </Routes>
        <ScrollToTopButton />
      </div>

      <Footer />
    </>
  );
}

export default App;
