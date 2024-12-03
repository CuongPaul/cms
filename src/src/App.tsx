import { useState, useReducer } from "react";
import { Route, Routes, Navigate, BrowserRouter } from "react-router-dom";

import { AppContext } from "./contexts";
import { Layout, PrivateRoute } from "./components";
import { AccountReducer, initialAccountState } from "./contexts/account";
import { Home, SignIn, Account, Product, Category, NotFound } from "./pages";

const App = () => {
  const accessToken = localStorage.getItem("accessToken");

  const [accountState, accountDispatch] = useReducer(
    AccountReducer,
    initialAccountState
  );

  const [isGlobalLoading, setIsGlobalLoading] = useState(false);

  return (
    <AppContext.Provider
      value={{
        accountState,
        accountDispatch,

        isGlobalLoading,
        setIsGlobalLoading,
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route element={<Layout />}>
              <Route path="/home" element={<Home />} />
              <Route path="/account" element={<Account />} />
              <Route path="/product" element={<Product />} />
              <Route path="/category" element={<Category />} />
            </Route>
          </Route>
          <Route
            path="/"
            element={accessToken ? <Navigate to="/home" /> : <SignIn />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
};

export default App;
