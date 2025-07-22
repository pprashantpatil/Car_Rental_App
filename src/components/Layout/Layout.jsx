import React, { Fragment } from "react";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Routers from "../../routers/Routers";
import { LoadingProvider } from "../../contexts/LoadingContext";
const Layout = () => {
  return (
    <div className="layout-wrapper">
      <Header />
      <main className="content-area">
        <LoadingProvider>
          <Routers />
        </LoadingProvider>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
