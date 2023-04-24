import React from "react";
import Breadcrumb from "@/components/breadcrumbs";
import Footer from "./Footer";
import Header from "./Header";

const DefaultLayout = ({ children }) => {
  return (
    <div className="flex flex-col h-screen justify-between">
      <Header fixed />
      <div className="w-full flex flex-wrap items-center justify-between">
        <div className="container px-4 mx-auto">
          <section className="header relative pt-16 items-center">
            <Breadcrumb />
          </section>
          <section>{children}</section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DefaultLayout;
