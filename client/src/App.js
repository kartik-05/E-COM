import Navbar from "./components/Navbar/Navbar";
import "./App.css";
import Home from "./components/Home/Home";
import { Routes, Route } from "react-router-dom";
import Category from "./components/Category/Category";
import MyProducts from "./components/MyProducts/MyProducts";
import { useDispatch } from "react-redux";
import { getGamePosts } from "./actions/GamePosts";
import { useEffect } from "react";
import ProductInfo from "./components/ProductInfo/ProductInfo";
import EditProduct from "./components/EditProduct/EditProduct";
import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer/Footer";
import Signin from "./components/Signin/Signin";
import Wishlist from "./components/Wishlist/Wishlist";
import Cart from "./components/Cart/Cart";
import BuyNow from "./components/BuyNow/BuyNow";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getGamePosts());
    dispatch({ type: "getUser" });
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <div className="app-container">
        <Toaster />
        {/* <Heading/> */}
        <div className="hero-section-container">
          <div className="hero-section">
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route path="/sell" element={<Category />} />
              <Route path="/edit/" element={<EditProduct />} />
              <Route path="/MyProducts" element={<MyProducts />} />
              <Route path="/sell/:category/:id" element={<EditProduct />} />
              <Route path="/sell/:category" element={<EditProduct />} />
              <Route path="/product/:id" element={<ProductInfo />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/auth" element={<Signin />} />
              <Route path="/BuyNow" element={<BuyNow />} />
            </Routes>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}

export default App;
