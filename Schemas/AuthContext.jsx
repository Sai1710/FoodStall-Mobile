import React, { createContext, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isCustomerLoggedIn, setIsCustomerLoggedIn] = useState(false);

  const [isVendorLoggedIn, setIsVendorLoggedIn] = useState(false);

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  return (
    <AuthContext.Provider
      value={{
        isCustomerLoggedIn,
        isAdminLoggedIn,
        isVendorLoggedIn,
        setIsAdminLoggedIn,
        setIsCustomerLoggedIn,
        setIsVendorLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
