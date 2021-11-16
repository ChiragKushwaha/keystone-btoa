import { createContext, useContext, useState } from "react";

const LocalStateContext: any = createContext(undefined) as any;

function CartStateProvider({ children }: any) {
  //? This is our own custom provider! we will store data (State) and functionality (updaters) in here and anyone can access it via the consumers!

  const [cartOpen, setCartOpen] = useState(false);

  function toggleCart() {
    setCartOpen(!cartOpen);
  }

  function closeCart() {
    setCartOpen(false);
  }

  function openCart() {
    setCartOpen(true);
  }

  return (
    <LocalStateContext.Provider
      value={{ cartOpen, setCartOpen, toggleCart, openCart, closeCart }}
    >
      {children}
    </LocalStateContext.Provider>
  );
}

// make a custom hook for accessing the cart local state
function useCart() {
  return useContext(LocalStateContext);
}

export { CartStateProvider, useCart };
