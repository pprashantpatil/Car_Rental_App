import React, { createContext, useState, useContext } from "react";
import "../../src/styles/Loading-context.css";

const LoadingContext = createContext();

export const useLoading = () => useContext(LoadingContext);

export const LoadingProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const showLoader = () => setLoading(true);
  const hideLoader = () => setLoading(false);

  return (
    <LoadingContext.Provider value={{ loading, showLoader, hideLoader }}>
      {children}
      {loading && (
        <div className="global-loader">
          <i className="ri-loader-4-line ri-spin"></i>
          <p>Loading, please wait...</p>
        </div>
      )}
    </LoadingContext.Provider>
  );
};
