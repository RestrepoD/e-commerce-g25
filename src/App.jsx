import { Outlet } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/common/Navbar/Navbar";
import "./App.css";
import Cart from "./components/common/Cart/Cart";

function App() {
  const [isCartVisible, setIsCartVisible] = useState(false);

  function cartVisibility() {
    setIsCartVisible(!isCartVisible);
  }

  return (
    <>
      <Navbar updateCartVisibility={cartVisibility} />
      <main>
        <Outlet />
      </main>
      <Cart isVisible={isCartVisible} />
    </>
  );
}

export default App;
