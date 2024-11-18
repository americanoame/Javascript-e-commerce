import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";


const App = () => {
  return (
    <>
     <ScrollToTop />
      <Header />
      <div id="app-root" className="flex flex-col min-h-screen">
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default App;
