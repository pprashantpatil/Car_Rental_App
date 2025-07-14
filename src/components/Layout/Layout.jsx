import React, { Fragment } from "react";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Routers from "../../routers/Routers";

const Layout = () => {
  return (
    <div className="layout-wrapper">
      <Header />
      <main className="content-area">
        <Routers />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
