import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const LayoutContext = createContext();

const LayoutProvider = ({ children }) => {
  const [cartQuantity, setCartQuantity] = useState(0);

  useEffect(() => {
    axios.get("cart").then((res) => {
      let quantity = 0;
      res.data.forEach((item) => (quantity += item.quantity));
      setCartQuantity(quantity);
    });
  }, []);

  return (
    <>
      <LayoutContext.Provider value={{ cartQuantity, setCartQuantity }}>
        {children}
      </LayoutContext.Provider>
    </>
  );
};

const useLayout = () => {
  return useContext(LayoutContext);
};

export { LayoutProvider, useLayout };
